import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchReservationById } from "../../API/reservationApi";
import "../styles/Reservation.css";

export default function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchReservationById(id)
      .then(data => {
        if (!mounted) return;
        setReservation(data);
        setError(null);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || "Failed to load reservation");
        setReservation(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [id]);

  if (loading) return (
    <div className="reservation-page">
      <div className="reservation-detail-container">
        <div className="loading-message">Loading reservation...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="reservation-page">
      <div className="reservation-detail-container">
        <div className="error-message">{error}</div>
        <div className="detail-actions">
          <button className="reservation-btn" onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    </div>
  );

  if (!reservation) return (
    <div className="reservation-page">
      <div className="reservation-detail-container">
        <div className="error-message">No reservation found.</div>
        <div className="detail-actions">
          <button className="reservation-btn" onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    </div>
  );

  const {
    reservationId,
    user,
    vehicle,
    parkingSpot,
    date,
    startTime,
    endTime,
    price
  } = reservation;

  return (
    <div className="reservation-page">
      {/* Hero Section */}
      <div className="reservation-hero">
        <div className="reservation-hero-content">
          <h1>Reservation Details</h1>
          <p>View your reservation information</p>
        </div>
      </div>

      {/* Details Container */}
      <div className="reservation-detail-container">
        <div className="reservation-detail-header">
          <div className="reservation-detail-title">Reservation #{reservationId}</div>
          <div className="reservation-detail-underline"></div>
        </div>

        <div className="reservation-detail-content">
          <div className="detail-card">
            <h3>User Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">User ID:</span>
                <span className="detail-value">{user?.userID || "—"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">User Name:</span>
                <span className="detail-value">{user?.name || "—"}</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Vehicle Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">License Plate:</span>
                <span className="detail-value">{vehicle?.licensePlate || "—"}</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Parking Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Spot Number:</span>
                <span className="detail-value">{parkingSpot?.spotNumber || "—"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{startTime} — {endTime}</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Payment Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Price:</span>
                <span className="detail-value">R{price}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="reservation-btn" onClick={() => navigate(-1)}>Back to Reservations</button>
        </div>
      </div>
    </div>
  );
}
