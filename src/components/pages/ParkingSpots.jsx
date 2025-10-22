import "../styles/ParkingSpots.css";
import { saveAll } from "../../API/parkingSpotsApi";
import { useState } from "react";

const ParkingSpot = ({ spot, onStatusChange }) => {
  const colours = ["green", "red", "orange"];
  const statuses = ["Available", "Occupied", "Reserved"];

  const handleClick = () => {
    const currentIndex = statuses.indexOf(spot.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];
    const newColour = colours[nextIndex];
    onStatusChange(spot.spotNumber, newStatus, newColour);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{ backgroundColor: spot.colour }}
    >
      <h2>P{spot.spotNumber}</h2>
      <p className="type">{spot.status}</p>
    </div>
  );
};

const ParkingLot = () => {

  const [parkingSpots, setParkingSpots] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      spotNumber: i + 1,
      status: "Available",
      colour: "green",
      parkingLot: { lotId: "PK1234" } 
    }))
  );

  const handleStatusChange = (spotNumber, status, colour) => {
    setParkingSpots(prev =>
      prev.map(spot =>
        spot.spotNumber === spotNumber ? { ...spot, status, colour } : spot
      )
    );
  };

  const handleConfirm = async () => {
    try {
      await saveAll(parkingSpots);
      alert("Parking spots saved successfully!");
    } catch (error) {
      alert("Error saving parking spots.");
    }
  };

  return (
    <div>
      <h2 className="Title">Parking Lot</h2>

      <div className="parking-container">
        {parkingSpots.map(spot => (
          <ParkingSpot
            key={spot.spotNumber}
            spot={spot}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      <div className="parent-container">
        <button type="button" className="confirm" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ParkingLot;
