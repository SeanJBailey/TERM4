import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"; 
import capetown  from "../assets/capetown.png";
import p         from "../assets/p.png";
import woodstock from "../assets/woodstock.png";
import mont      from "../assets/mont.png";
import century   from "../assets/century.png";
import vn        from "../assets/vn.png";


const lots = [
   { id: 1, name: "Parrow",       img: capetown },
  { id: 2, name: "Bellville",    img: p },
  { id: 3, name: "Woodstock",    img: woodstock },
  { id: 4, name: "Monte Vista",  img: mont },
  { id: 5, name: "Century City", img: century },
  { id: 6, name: "Cape Town V&A",img: vn },
];

export default function Home() {
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.trim();
    navigate(q ? `/reservations?query=${encodeURIComponent(q)}` : "/reservations");
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
        {lots.map((lot) => (
          <article key={lot.id} className="lot-card" tabIndex={0}>
            <img src={lot.img} alt={lot.name} loading="lazy" />
            <div className="lot-card__footer">
              <h3>{lot.name}</h3>
              <Link
                className="btn btn-grad btn-sm"
                to={`/reservations?lot=${encodeURIComponent(lot.name)}`}
              >
                Book
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* ACTION BAR */}
      <section className="home-actions">
        <Link to="/reservations" className="btn btn-grad">Make a Reservation</Link>
        <Link to="/vehicles" className="btn btn-grad">Manage Vehicles</Link>
        <Link to="/tickets" className="btn btn-grad">View Tickets</Link>
      </section>
    </main>
  );
}
