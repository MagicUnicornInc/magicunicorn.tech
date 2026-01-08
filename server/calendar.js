import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { format, addDays, startOfDay, parseISO, isBefore, isAfter, addMinutes } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

// Configuration
const TIMEZONE = process.env.TIMEZONE || 'America/New_York';
const APPOINTMENT_DURATION = 60; // minutes
const DAYS_AHEAD = 14;

// =====================================================
// BUSINESS HOURS CONFIGURATION
// =====================================================
// Format: Array of time ranges in 24-hour format
// Each day can have multiple time blocks
// Set to null or empty array for closed days
//
// To change hours: Edit the start/end times below
// To close a day: Set it to null
// To add more blocks: Add another { start: 'HH:MM', end: 'HH:MM' } object
// =====================================================
const BUSINESS_HOURS = {
  0: null, // Sunday - closed
  1: [  // Monday
    { start: '10:00', end: '18:00' },  // 10 AM - 6 PM
    { start: '20:00', end: '24:00' },  // 8 PM - Midnight (last slot at 11 PM)
  ],
  2: [  // Tuesday
    { start: '10:00', end: '18:00' },
    { start: '20:00', end: '24:00' },  // 8 PM - Midnight
  ],
  3: [  // Wednesday
    { start: '10:00', end: '18:00' },
    { start: '20:00', end: '24:00' },  // 8 PM - Midnight
  ],
  4: [  // Thursday
    { start: '10:00', end: '18:00' },
    { start: '20:00', end: '24:00' },  // 8 PM - Midnight
  ],
  5: [  // Friday
    { start: '10:00', end: '18:00' },
    { start: '20:00', end: '24:00' },  // 8 PM - Midnight
  ],
  6: null, // Saturday - closed
};

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.MS365_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS365_TENANT_ID}`,
    clientSecret: process.env.MS365_CLIENT_SECRET,
  }
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// Get access token using client credentials flow
async function getAccessToken() {
  try {
    const result = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default']
    });
    return result.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    throw error;
  }
}

// Create Microsoft Graph client
async function getGraphClient() {
  const accessToken = await getAccessToken();
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });
}

// Generate time slots for a single time range
function generateSlotsForRange(date, timeRange) {
  const slots = [];

  // Get the calendar date in the target timezone
  const zonedDate = utcToZonedTime(date, TIMEZONE);
  const dateStr = format(zonedDate, 'yyyy-MM-dd');

  // Parse start/end times and convert to UTC properly
  // By parsing ISO strings with the date, we get correct timezone handling
  const startTimeStr = `${dateStr}T${timeRange.start}:00`;
  const endTimeStr = `${dateStr}T${timeRange.end}:00`;

  // Convert these local times to UTC
  let currentTime = zonedTimeToUtc(parseISO(startTimeStr), TIMEZONE);
  const endTime = zonedTimeToUtc(parseISO(endTimeStr), TIMEZONE);

  // Subtract appointment duration from end time to ensure full slots
  const lastSlotStart = addMinutes(endTime, -APPOINTMENT_DURATION);

  while (isBefore(currentTime, lastSlotStart) || currentTime.getTime() === lastSlotStart.getTime()) {
    // Convert back to zoned time for display
    const displayTime = utcToZonedTime(currentTime, TIMEZONE);
    slots.push({
      date: format(displayTime, 'yyyy-MM-dd'),
      time: format(displayTime, 'h:mm a'),
      datetime: currentTime.toISOString(),
      available: true
    });
    currentTime = addMinutes(currentTime, 60); // 1-hour slots
  }

  return slots;
}

// Generate time slots for a given day (supports multiple time ranges)
function generateTimeSlotsForDay(date, businessHours) {
  const slots = [];
  if (!businessHours) return slots;

  // Handle both single object and array of time ranges
  const timeRanges = Array.isArray(businessHours) ? businessHours : [businessHours];

  for (const range of timeRanges) {
    slots.push(...generateSlotsForRange(date, range));
  }

  return slots;
}

// Check calendar for busy times
async function getBusyTimes(startDateTime, endDateTime) {
  try {
    const client = await getGraphClient();
    const userEmail = process.env.MS365_USER_EMAIL;

    // Use calendar view to get events
    const events = await client
      .api(`/users/${userEmail}/calendar/calendarView`)
      .query({
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        $select: 'start,end,showAs'
      })
      .get();

    // Filter to busy/tentative events
    return events.value
      .filter(e => e.showAs === 'busy' || e.showAs === 'tentative')
      .map(e => ({
        start: new Date(e.start.dateTime + 'Z'),
        end: new Date(e.end.dateTime + 'Z')
      }));
  } catch (error) {
    console.error('Error getting busy times:', error);
    return [];
  }
}

// Check if a slot overlaps with busy times
function isSlotBusy(slotStart, slotEnd, busyTimes) {
  return busyTimes.some(busy => {
    return (slotStart < busy.end && slotEnd > busy.start);
  });
}

// Main function: Get available slots for the next N days
export async function getAvailableSlots(daysAhead = DAYS_AHEAD) {
  const availability = [];
  const now = new Date();

  // Convert current time to target timezone to get the correct "today"
  const nowInTimezone = utcToZonedTime(now, TIMEZONE);
  const todayInTimezone = startOfDay(nowInTimezone);

  // We need UTC dates for the busy times query, but timezone-aware dates for day-of-week
  const startDateUtc = zonedTimeToUtc(todayInTimezone, TIMEZONE);
  const endDateUtc = addDays(startDateUtc, daysAhead);

  // Get all busy times for the period
  const busyTimes = await getBusyTimes(startDateUtc, endDateUtc);

  for (let i = 0; i < daysAhead; i++) {
    // Work in the target timezone for day calculations
    const currentDateInTz = addDays(todayInTimezone, i);
    const dayOfWeek = currentDateInTz.getDay();
    const businessHours = BUSINESS_HOURS[dayOfWeek];

    if (!businessHours) continue; // Skip closed days

    // Pass the timezone-aware date for slot generation
    const currentDateUtc = zonedTimeToUtc(startOfDay(currentDateInTz), TIMEZONE);
    const slots = generateTimeSlotsForDay(currentDateUtc, businessHours);

    // Filter out past times and busy slots
    const availableSlots = slots.filter(slot => {
      const slotStart = new Date(slot.datetime);
      const slotEnd = addMinutes(slotStart, APPOINTMENT_DURATION);

      // Skip if slot is in the past (with 30 min buffer)
      if (isBefore(slotStart, addMinutes(now, 30))) {
        return false;
      }

      // Skip if slot overlaps with busy time
      if (isSlotBusy(slotStart, slotEnd, busyTimes)) {
        return false;
      }

      return true;
    });

    if (availableSlots.length > 0) {
      // Format dates in the target timezone for display
      const displayDate = utcToZonedTime(currentDateUtc, TIMEZONE);
      availability.push({
        date: format(displayDate, 'yyyy-MM-dd'),
        dayName: format(displayDate, 'EEEE, MMMM d'),
        slots: availableSlots
      });
    }
  }

  return availability;
}

// Check if a specific slot is still available
export async function isSlotStillAvailable(datetime) {
  const slotStart = new Date(datetime);
  const slotEnd = addMinutes(slotStart, APPOINTMENT_DURATION);
  const busyTimes = await getBusyTimes(slotStart, slotEnd);
  return !isSlotBusy(slotStart, slotEnd, busyTimes);
}

// Create a calendar event for the appointment
export async function createAppointmentEvent(data) {
  const { name, email, phone, service, message, datetime } = data;

  try {
    const client = await getGraphClient();
    const userEmail = process.env.MS365_USER_EMAIL;

    const startTime = new Date(datetime);
    const endTime = addMinutes(startTime, APPOINTMENT_DURATION);

    const serviceNames = {
      'ai-solutions': 'AI Solutions Consultation',
      'automation': 'Automation Services',
      'development': 'Custom Development',
      'analytics': 'Data Analytics',
      'creative': 'Creative Tech',
      'innovation': 'Innovation Lab',
      'internship': 'Internship Program',
      'accelerator': 'Technical Accelerator',
      'other': 'General Consultation'
    };

    const serviceName = serviceNames[service] || service || 'Consultation';

    const event = {
      subject: `Consultation: ${name} - ${serviceName}`,
      body: {
        contentType: 'HTML',
        content: `
          <h2>Consultation Appointment</h2>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service Interest:</strong> ${serviceName}</p>
          ${message ? `<p><strong>Notes:</strong> ${message}</p>` : ''}
          <hr>
          <p><em>Booked via magicunicorn.tech</em></p>
        `
      },
      start: {
        dateTime: startTime.toISOString().replace('Z', ''),
        timeZone: TIMEZONE
      },
      end: {
        dateTime: endTime.toISOString().replace('Z', ''),
        timeZone: TIMEZONE
      },
      attendees: [
        {
          emailAddress: {
            address: email,
            name: name
          },
          type: 'required'
        }
      ],
      isReminderOn: true,
      reminderMinutesBeforeStart: 60
    };

    const createdEvent = await client
      .api(`/users/${userEmail}/calendar/events`)
      .post(event);

    console.log(`Calendar event created: ${createdEvent.id}`);
    return createdEvent.id;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}
