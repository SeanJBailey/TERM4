import axios from "axios";

const BASE_URL = "http://localhost:8080/api/parkingLots";

// Fetch all parking lots
export async function fetchParkingLots() {
  const res = await axios.get(`${BASE_URL}/all`);
  return res.data;
}

// Fetch a single parking lot by lotId
export async function fetchParkingLotById(lotId) {
  const res = await axios.get(`${BASE_URL}/read/${lotId}`);
  return res.data;
}

// Create a parking lot (multipart/form-data)
export async function createParkingLot(formData) {
  const res = await axios.post(`${BASE_URL}/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// Update a parking lot (multipart/form-data)
// Workaround: Use POST with _method=PUT or use Axios config
export async function updateParkingLot(lotId, formData) {
  // Add a hidden field for Spring Boot workaround if needed:
  // formData.append("_method", "PUT");

  const res = await axios({
    method: "post", // POST works reliably with multipart
    url: `${BASE_URL}/update/${lotId}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

// Delete a parking lot by lotId
export async function deleteParkingLot(lotId) {
  const res = await axios.delete(`${BASE_URL}/delete/${lotId}`);
  return res.data;
}
