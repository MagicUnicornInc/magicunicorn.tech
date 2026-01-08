import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { format, parseISO } from 'date-fns';

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.MS365_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS365_TENANT_ID}`,
    clientSecret: process.env.MS365_CLIENT_SECRET,
  }
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// Get access token
async function getAccessToken() {
  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default']
  });
  return result.accessToken;
}

// Create Graph client
async function getGraphClient() {
  const accessToken = await getAccessToken();
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });
}

// Service name mapping
const serviceNames = {
  'ai-solutions': 'AI Solutions',
  'automation': 'Automation Services',
  'development': 'Custom Development',
  'analytics': 'Data Analytics',
  'creative': 'Creative Tech',
  'innovation': 'Innovation Lab',
  'internship': 'Internship Program',
  'accelerator': 'Technical Accelerator',
  'other': 'General Inquiry'
};

// Format datetime for display
function formatAppointmentTime(datetime) {
  const date = parseISO(datetime);
  return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
}

// Send email via Microsoft Graph
async function sendEmail(to, subject, htmlContent) {
  try {
    const client = await getGraphClient();
    const userEmail = process.env.MS365_USER_EMAIL;

    await client.api(`/users/${userEmail}/sendMail`).post({
      message: {
        subject,
        body: {
          contentType: 'HTML',
          content: htmlContent
        },
        toRecipients: [
          {
            emailAddress: { address: to }
          }
        ]
      },
      saveToSentItems: true
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Generate business owner notification email
function generateOwnerEmail(data) {
  const { name, email, phone, service, message, scheduledDatetime } = data;
  const serviceName = serviceNames[service] || service || 'General';
  const isScheduled = !!scheduledDatetime;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #121212; border-radius: 15px; padding: 30px; }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 24px; font-weight: bold; background: linear-gradient(45deg, #b66eff, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .scheduled-banner { background: linear-gradient(45deg, #b66eff, #00d4ff); color: white; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 20px; }
    .scheduled-banner h2 { margin: 0; font-size: 18px; }
    .scheduled-banner .time { font-size: 24px; font-weight: bold; margin-top: 10px; }
    .inquiry-banner { background: #2a2a2a; border-left: 4px solid #b66eff; padding: 15px; margin-bottom: 20px; }
    .detail-row { padding: 12px 0; border-bottom: 1px solid #2a2a2a; }
    .detail-row:last-child { border-bottom: none; }
    .label { color: #b3b3b3; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
    .value { font-size: 16px; color: #ffffff; }
    .notes { background: #1a1a1a; padding: 15px; border-radius: 8px; margin-top: 20px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Magic Unicorn Tech</div>
      <p style="color: #b3b3b3;">New Booking Request</p>
    </div>

    ${isScheduled ? `
    <div class="scheduled-banner">
      <h2>SCHEDULED CONSULTATION</h2>
      <div class="time">${formatAppointmentTime(scheduledDatetime)}</div>
    </div>
    ` : `
    <div class="inquiry-banner">
      <strong>New Inquiry</strong> - No specific time selected
    </div>
    `}

    <div class="detail-row">
      <div class="label">Client Name</div>
      <div class="value">${name}</div>
    </div>

    <div class="detail-row">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}" style="color: #b66eff;">${email}</a></div>
    </div>

    ${phone ? `
    <div class="detail-row">
      <div class="label">Phone</div>
      <div class="value"><a href="tel:${phone}" style="color: #b66eff;">${phone}</a></div>
    </div>
    ` : ''}

    <div class="detail-row">
      <div class="label">Service Interest</div>
      <div class="value">${serviceName}</div>
    </div>

    ${message ? `
    <div class="notes">
      <div class="label">Additional Notes</div>
      <p style="margin: 10px 0 0; color: #e0e0e0;">${message}</p>
    </div>
    ` : ''}

    <div class="footer">
      <p>This booking was submitted via magicunicorn.tech</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Generate customer confirmation email
function generateCustomerEmail(data) {
  const { name, service, scheduledDatetime } = data;
  const serviceName = serviceNames[service] || service || 'your inquiry';
  const isScheduled = !!scheduledDatetime;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #121212; border-radius: 15px; padding: 30px; }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; background: linear-gradient(45deg, #b66eff, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .confirmation-banner { background: linear-gradient(45deg, #b66eff, #00d4ff); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 25px; }
    .confirmation-banner h2 { margin: 0 0 10px; font-size: 20px; }
    .confirmation-banner .time { font-size: 22px; font-weight: bold; }
    .inquiry-banner { background: #2a2a2a; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 25px; }
    .content { color: #e0e0e0; line-height: 1.7; }
    .content h3 { color: #ffffff; margin-top: 25px; }
    .content ul { padding-left: 20px; }
    .content li { margin-bottom: 8px; }
    .cta { text-align: center; margin: 30px 0; }
    .cta a { display: inline-block; background: linear-gradient(45deg, #b66eff, #00d4ff); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 500; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #2a2a2a; color: #666; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Magic Unicorn Tech</div>
    </div>

    ${isScheduled ? `
    <div class="confirmation-banner">
      <h2>Your Consultation is Confirmed!</h2>
      <div class="time">${formatAppointmentTime(scheduledDatetime)}</div>
      <p style="margin: 10px 0 0; opacity: 0.9;">Calendar invite sent to your email</p>
    </div>
    ` : `
    <div class="inquiry-banner">
      <h2 style="margin: 0; color: #ffffff;">Thank You for Reaching Out!</h2>
      <p style="margin: 10px 0 0; color: #b3b3b3;">We'll respond within 24 hours</p>
    </div>
    `}

    <div class="content">
      <p>Hi ${name.split(' ')[0]},</p>

      ${isScheduled ? `
      <p>Thank you for scheduling a consultation about <strong>${serviceName}</strong>. We're excited to learn more about your project!</p>

      <h3>What to Expect</h3>
      <ul>
        <li>Duration: Approximately 1 hour</li>
        <li>We'll discuss your goals and requirements</li>
        <li>We'll explore potential solutions tailored to your needs</li>
        <li>You'll receive a follow-up summary and recommendations</li>
      </ul>

      <h3>Need to Reschedule?</h3>
      <p>No problem! Simply reply to this email or use the calendar invite to propose a new time.</p>
      ` : `
      <p>Thank you for your interest in our <strong>${serviceName}</strong> services. We've received your inquiry and will review it promptly.</p>

      <h3>What Happens Next?</h3>
      <ul>
        <li>Our team will review your request</li>
        <li>We'll reach out within 24 hours</li>
        <li>We'll schedule a consultation at your convenience</li>
      </ul>
      `}
    </div>

    <div class="cta">
      <a href="https://magicunicorn.tech">Visit Our Website</a>
    </div>

    <div class="footer">
      <p><strong>Magic Unicorn Tech</strong></p>
      <p>Creating magical digital experiences</p>
      <p style="margin-top: 15px;">
        <a href="https://magicunicorn.tech" style="color: #b66eff;">magicunicorn.tech</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Main function: Send booking notification emails
export async function sendBookingEmails(data) {
  const { email, scheduledDatetime } = data;
  const ownerEmail = process.env.MS365_USER_EMAIL;
  const serviceName = serviceNames[data.service] || data.service || 'Inquiry';

  // Determine subject lines
  const ownerSubject = scheduledDatetime
    ? `SCHEDULED: ${data.name} - ${formatAppointmentTime(scheduledDatetime)}`
    : `New Inquiry: ${data.name} - ${serviceName}`;

  const customerSubject = scheduledDatetime
    ? `Your Consultation is Confirmed - ${formatAppointmentTime(scheduledDatetime)}`
    : `Thank You for Contacting Magic Unicorn Tech`;

  // Send both emails
  await Promise.all([
    sendEmail(ownerEmail, ownerSubject, generateOwnerEmail(data)),
    sendEmail(email, customerSubject, generateCustomerEmail(data))
  ]);
}
