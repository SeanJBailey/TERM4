import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"; 
import { fetchParkingLots, deleteParkingLot } from "../../API/parkingApi";
import ParkingLotForm from "./ParkingLotForm";
import ParkingLotList from "../javascript/ParkingLotList";

export default function Home({ currentUser }) {
  const navigate = useNavigate();
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchParkingLots();
      setLots(data);
    } catch (e) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.trim();
    navigate(q ? `/reservations?query=${encodeURIComponent(q)}` : "/reservations");
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this parking lot?')) return;
    try {
      await deleteParkingLot(id);
      await load();
    } catch (e) {
      // use window.alert to avoid lint flagged globals too
      window.alert(e.message || 'Delete failed');
    }
  };

  const handleSaved = () => { setEditing(null); load(); };

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
        <Link to="/parkingspots" className="btn btn-grad">Parking Spots</Link>

      </section>
    </main>
  );
}
