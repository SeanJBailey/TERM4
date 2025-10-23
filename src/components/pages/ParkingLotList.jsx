// src/components/pages/ParkingLotList.jsx
import React from "react";
import "../styles/Home.css";

const ParkingLotList = ({ parkingLots, onDelete }) => {
  if (!parkingLots || parkingLots.length === 0) {
    return <p>No parking lots available.</p>;
  }

  return (
    <div className="parking-list"> {/* Match the CSS class */}
      {parkingLots.map(lot => (
        <div key={lot.lotId} className="parking-card"> {/* Match the CSS class */}
          {lot.image && (
            <img
              src={lot.image}
              alt={lot.title}
            />
          )}
          <h3>{lot.title}</h3>
          <p>Location: {lot.location}</p>
          <p>Open: {lot.openTime} - {lot.closingTime}</p>
          <p>Price per hour: ${lot.pricePerHour}</p>
          <div className="actions">
            <button className="book-btn" onClick={() => onDelete(lot.lotId)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingLotList;
