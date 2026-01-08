import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import '../styles/TimeSlotPicker.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

function TimeSlotPicker({ onSelect, selectedSlot }) {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayOffset, setDayOffset] = useState(0);

  // Number of days to show in the day selector
  const VISIBLE_DAYS = 5;

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/api/available-slots?days=14`);
      const data = await response.json();

      if (data.success && data.availability.length > 0) {
        setAvailability(data.availability);
        setSelectedDay(data.availability[0]?.date);
      } else {
        setAvailability([]);
      }
    } catch (err) {
      console.error('Failed to fetch availability:', err);
      setError('Unable to load available times. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDaySelect = (date) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (slot) => {
    if (onSelect) {
      onSelect(slot);
    }
  };

  const handleClearSelection = () => {
    if (onSelect) {
      onSelect(null);
    }
  };

  const scrollDays = (direction) => {
    const maxOffset = Math.max(0, availability.length - VISIBLE_DAYS);
    if (direction === 'left') {
      setDayOffset(Math.max(0, dayOffset - 1));
    } else {
      setDayOffset(Math.min(maxOffset, dayOffset + 1));
    }
  };

  const visibleDays = availability.slice(dayOffset, dayOffset + VISIBLE_DAYS);
  const currentDaySlots = availability.find(d => d.date === selectedDay)?.slots || [];

  if (loading) {
    return (
      <div className="timeslot-picker loading">
        <FaSpinner className="spinner" />
        <p>Loading available times...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="timeslot-picker error">
        <p>{error}</p>
        <button onClick={fetchAvailability} className="btn btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  if (availability.length === 0) {
    return (
      <div className="timeslot-picker empty">
        <FaCalendarAlt className="empty-icon" />
        <p>No available times in the next 2 weeks.</p>
        <p className="subtext">Please contact us directly to schedule.</p>
      </div>
    );
  }

  return (
    <div className="timeslot-picker">
      {/* Selected slot summary */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            className="selected-summary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="selected-info">
              <FaCheck className="check-icon" />
              <div>
                <strong>{availability.find(d => d.date === selectedSlot.date)?.dayName}</strong>
                <span>{selectedSlot.time}</span>
              </div>
            </div>
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearSelection}
              aria-label="Clear selection"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day selector */}
      <div className="day-selector">
        <button
          type="button"
          className="nav-btn"
          onClick={() => scrollDays('left')}
          disabled={dayOffset === 0}
          aria-label="Previous days"
        >
          <FaChevronLeft />
        </button>

        <div className="days-container">
          {visibleDays.map((day) => {
            const [, monthDay] = day.dayName.split(', ');
            const dayParts = monthDay.split(' ');
            const monthName = dayParts[0].substring(0, 3);
            const dayNum = dayParts[1];
            const weekday = day.dayName.split(',')[0].substring(0, 3);
            const isSelected = selectedDay === day.date;
            const hasSelectedSlot = selectedSlot?.date === day.date;

            return (
              <motion.button
                key={day.date}
                type="button"
                className={`day-btn ${isSelected ? 'selected' : ''} ${hasSelectedSlot ? 'has-selection' : ''}`}
                onClick={() => handleDaySelect(day.date)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="weekday">{weekday}</span>
                <span className="day-num">{dayNum}</span>
                <span className="month">{monthName}</span>
                <span className="slot-count">{day.slots.length} slots</span>
              </motion.button>
            );
          })}
        </div>

        <button
          type="button"
          className="nav-btn"
          onClick={() => scrollDays('right')}
          disabled={dayOffset >= availability.length - VISIBLE_DAYS}
          aria-label="Next days"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Time slots grid */}
      <div className="time-slots-container">
        <div className="time-header">
          <FaClock />
          <span>Available Times</span>
        </div>
        <div className="time-slots-grid">
          {currentDaySlots.map((slot) => {
            const isSelected = selectedSlot?.datetime === slot.datetime;

            return (
              <motion.button
                key={slot.datetime}
                type="button"
                className={`time-slot ${isSelected ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(slot)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slot.time}
                {isSelected && <FaCheck className="slot-check" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TimeSlotPicker;
