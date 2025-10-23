// src/components/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"; 
import { fetchParkingLots, deleteParkingLot } from "../../API/parkingApi";
import ParkingLotForm from "./ParkingLotForm";
import ParkingLotList from "../ParkingLotList";

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
    <main className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__content">
          <h1>Our Presence</h1>
          <p>Find secure parking across our locations.</p>

          <form className="home-search" onSubmit={onSearch}>
            <input
              name="q"
              placeholder="Where do you want to park?"
              aria-label="Search parking locations"
            />
            <button type="submit" className="btn btn-grad">Search</button>
          </form>
        </div>
      </section>

      {/* GRID */}
      <section className="home-grid">
        <ParkingLotList currentUser={currentUser} onEdit={(lot) => setEditing(lot)} />
      </section>

      {/* Inline editor */}
      {editing && (
        <section style={{padding:12}}>
          <h2>Edit Parking Lot</h2>
          <ParkingLotForm initial={editing} onSuccess={handleSaved} />
          <button className="btn" onClick={()=> setEditing(null)}>Close</button>
        </section>
      )}

      {/* ACTION BAR */}
      <section className="home-actions">
        <Link to="/reservations" className="btn btn-grad">Make a Reservation</Link>
        <Link to="/vehicles" className="btn btn-grad">Manage Vehicles</Link>
        <Link to="/tickets" className="btn btn-grad">View Tickets</Link>
      </section>
    </main>
  );
}
