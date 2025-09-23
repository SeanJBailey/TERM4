import React, { useState } from "react";
import { createReservation } from "../../API/reservationApi";
import "../styles/Reservation.css";
import email_icon from '../assets/email.png';
import calendar_icon from '../assets/calendar.png';
import time_icon from '../assets/phone.png';
import price_icon from '../assets/profile.png';


export default function ReservationForm({ onSuccess }) {
  const [userId, setUserId] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [spotNumber, setSpotNumber] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = () => {
    if (!userId.trim()) return "User ID is required";
    if (!spotNumber || isNaN(Number(spotNumber))) return "Valid spot number is required";
    if (!date) return "Date is required";
    if (!startTime || !endTime) return "Start and end times are required";
    if (!price || Number(price) <= 0) return "Price must be > 0";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(null);
    setLoading(true);

    const payload = {
      userId: userId.trim(),
      licensePlate: licensePlate.trim() || null,
      spotNumber: Number(spotNumber),
      date,
      startTime,
      endTime,
      price: Number(price)
    };

    try {
      const created = await createReservation(payload);
      setLoading(false);
      if (onSuccess) onSuccess(created);
      // Reset form
      setUserId("");
      setLicensePlate("");
      setSpotNumber("");
      setDate("");
      setStartTime("09:00");
      setEndTime("10:00");
      setPrice("");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Unknown error");
    }
  };

  return (
    <div className="reservation-page">
      {/* Hero Section */}
      <div className="reservation-hero">
        <div className="reservation-hero-content">
          <h1>AutoTicket - Reservations</h1>
          <p>Book your parking spot in advance</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="reservation-container">
        <div className="reservation-header">
          <div className="reservation-title">Create Reservation</div>
          <div className="reservation-underline"></div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="reservation-content">
          <div className="reservation-input-group">
            <img src={email_icon} alt="User ID"/>
            <input 
              value={userId} 
              onChange={e => setUserId(e.target.value)} 
              placeholder="User ID"
              required
            />
          </div>

          <div className="reservation-input-group">
            <img src={email_icon} alt="License Plate"/>
            <input 
              value={licensePlate} 
              onChange={e => setLicensePlate(e.target.value)} 
              placeholder="License Plate (optional)" 
            />
          </div>

          <div className="reservation-input-group">
            <img src={email_icon} alt="Spot Number"/>
            <input 
              type="number" 
              value={spotNumber} 
              onChange={e => setSpotNumber(e.target.value)} 
              placeholder="Spot Number"
              required
            />
          </div>

          <div className="reservation-input-group">
            <img src={calendar_icon} alt="Date"/>
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              placeholder="Date"
              required
            />
          </div>

          <div className="reservation-time-grid">
            <div className="reservation-input-group">
              <img src={time_icon} alt="Start Time"/>
              <input 
                type="time" 
                value={startTime} 
                onChange={e => setStartTime(e.target.value)} 
                placeholder="Start Time"
                required
              />
            </div>
            <div className="reservation-input-group">
              <img src={time_icon} alt="End Time"/>
              <input 
                type="time" 
                value={endTime} 
                onChange={e => setEndTime(e.target.value)} 
                placeholder="End Time"
                required
              />
            </div>
          </div>

          <div className="reservation-input-group">
            <img src={price_icon} alt="Price"/>
            <input 
              type="number" 
              step="0.01" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              placeholder="Price (ZAR)"
              required
            />
          </div>

          <div className="reservation-actions">
            <button type="submit" disabled={loading} className="reservation-btn">
              {loading ? 'Saving...' : 'Create Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
