/* src/api/reservationApi.js */

/* const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';


export async function createReservation(payload) {
  return fetchJson(`${API_BASE}/api/reservation/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function fetchReservations() {
  return fetchJson(`${API_BASE}/api/reservation/all`);
}

export async function fetchReservationById(id) {
  return fetchJson(`${API_BASE}/api/reservation/read/${id}`);
}*/

/*np export async function createReservation(payload) {
  // json-server will auto-create an id and return the created object
  return fetchJson(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

 export async function fetchReservations() {
  return fetchJson(`${API_BASE}/reservations`);
}

 export async function fetchReservationById(id) {
  // our list uses "reservationId", but json-server uses numeric id in path.
  // Try to find by reservationId first; if id is numeric, fetch by numeric id.
  if (!isNaN(Number(id))) {
    return fetchJson(`${API_BASE}/reservations/${id}`);
  }
  // search by reservationId field
  const arr = await fetchJson(`${API_BASE}/reservations?reservationId=${encodeURIComponent(id)}`);
  if (Array.isArray(arr) && arr.length) return arr[0];
  throw new Error('Not found');
} */

  // src/api/reservationApi.js
export async function fetchReservations() {
  return [
    { reservationId: "r-1", user: { userID: "U1" }, parkingSpot: { spotNumber: 101 }, date: "2025-08-27" },
    { reservationId: "r-2", user: { userID: "U2" }, parkingSpot: { spotNumber: 202 }, date: "2025-08-28" }
  ];
}

export async function fetchReservationById(id) {
  const reservations = await fetchReservations();
  return reservations.find(r => r.reservationId === id);
}

export async function createReservation(payload) {
  console.log("Mock createReservation:", payload);
  return { ...payload, reservationId: "r-" + Math.floor(Math.random() * 1000) };
}
