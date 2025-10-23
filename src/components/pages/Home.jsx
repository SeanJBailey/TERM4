// src/components/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getAllParkingLots, deleteParkingLot } from "../../API/parkingApi";
import ParkingLotList from "./ParkingLotList";
import "../styles/Home.css";

const Home = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all parking lots on component mount
  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      setLoading(true);
      const data = await getAllParkingLots();
      setParkingLots(data);
    } catch (error) {
      console.error("Error fetching parking lots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lotId) => {
    if (window.confirm("Are you sure you want to delete this parking lot?")) {
      try {
        await deleteParkingLot(lotId);
        setParkingLots(parkingLots.filter(lot => lot.lotId !== lotId));
      } catch (error) {
        console.error("Failed to delete parking lot:", error);
      }
    }
  };

  return (
    <div className="home-container">
      <h1>Parking Lots</h1>
      {loading ? (
        <p>Loading parking lots...</p>
      ) : (
        <ParkingLotList parkingLots={parkingLots} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
