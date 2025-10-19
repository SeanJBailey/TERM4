import React, { useEffect, useState } from "react";
import { fetchParkingLots, deleteParkingLot } from "../API/parkingApi";
import "./styles/ParkingLotList.css";

export default function ParkingLotList({ currentUser, onEdit }) {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLots = async () => {
    try {
      setLoading(true);
      const data = await fetchParkingLots();
      setLots(data);
    } catch (err) {
      setError(err.message || "Failed to load parking lots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLots();
  }, []);

  const handleDelete = async (lotId) => {
    if (!window.confirm("Are you sure you want to delete this parking lot?")) return;
    try {
      await deleteParkingLot(lotId);
      loadLots();
    } catch (err) {
      alert(err.message);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/default-lot.png"; // fallback image
    // Ensure the URL works with Spring Boot static resource handler
    const fileName = imagePath.split(/[/\\]/).pop(); // get file name only
    return `http://localhost:8080/uploads/${fileName}`;
  };

  return (
    <div className="parking-list">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !lots.length && <p>No parking lots available</p>}

      {lots.map((lot) => (
        <div key={lot.lotId} className="parking-card">
          <img
            src={getImageUrl(lot.imagePath)}
            alt={lot.title}
            style={{ width: "200px", height: "120px", objectFit: "cover" }}
          />
          <h3>{lot.title}</h3>
          <p><b>Location:</b> {lot.location}</p>
          <p><b>Rate:</b> R{lot.pricePerHour}/hr</p>
          <p><b>Open:</b> {lot.openTime} - {lot.closingTime}</p>

          {(currentUser?.role === "admin") && (
            <div className="actions">
              <button onClick={() => onEdit(lot)}>Edit</button>
              <button onClick={() => handleDelete(lot.lotId)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
