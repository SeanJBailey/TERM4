import React, { useEffect, useState } from "react";
import { fetchReservations } from "../../API/reservationApi";
import { Link } from "react-router-dom";
import "../styles/LoginSignup.css";

export default function ReservationList({ refreshFlag }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchReservations()
      .then(data => { if (mounted) setItems(data || []); })
      .catch(err => { if (mounted) setError(err.message || "Failed to load"); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [refreshFlag]);

  if (loading) return <div className="container"><div className="text">Loading reservations...</div></div>;
  if (error) return <div className="container"><div className="text-red-600">{error}</div></div>;
  if (!items.length) return <div className="container"><div className="text">No reservations found.</div></div>;

  return (
    <div className="container" style={{maxWidth: '800px'}}>
      <div className="header">
        <div className="text">Reservations</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {items.map(r => (
          <div key={r.reservationId} className="input" style={{flexDirection: 'column', alignItems: 'flex-start', height: 'auto', padding: '15px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <div>
                <div><strong>ID:</strong> {r.reservationId}</div>
                <div><strong>User:</strong> {r.user?.userID || '—'}</div>
                <div><strong>Spot:</strong> {r.parkingSpot?.spotNumber || '—'}</div>
                <div><strong>Date:</strong> {r.date}</div>
              </div>
              <div>
                <Link to={`/reservation/${encodeURIComponent(r.reservationId)}`} className="submit" style={{padding: '8px 16px', fontSize: '14px', textDecoration: 'none'}}>
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
