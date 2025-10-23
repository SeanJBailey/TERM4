// src/API/parkingApi.js
// --------------------

/**
 * Helper: ensures a valid data URL for images
 */
const toDataUrl = (image) => {
  if (!image) return null;
  if (typeof image === 'string') {
    if (image.startsWith('data:')) return image;
    if (/^[A-Za-z0-9+/=\s]+$/.test(image)) return `data:image/jpeg;base64,${image}`;
    return image; // fallback for URLs
  }
  return null;
};

// -------------------- CREATE --------------------
export const createParkingLot = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch("http://localhost:8080/api/parkingLots/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` 
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create parking lot");
  }

  const data = await response.json();
  if (data.image) data.image = toDataUrl(data.image);
  return data;
};


// -------------------- UPDATE --------------------
export const updateParkingLot = async (lotId, formData) => {
    const token = localStorage.getItem('token');
  // Spring Boot handles multipart POST with _method=PUT if needed
  const response = await fetch(`http://localhost:8000/api/parkingLots/update/${lotId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` 
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update parking lot");
  }

  const data = await response.json();
  if (data.image) data.image = toDataUrl(data.image);
  return data;
};

// -------------------- GET SINGLE --------------------
export const getParkingLot = async (lotId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8000/api/parkingLots/read/${lotId}`,{
    headers: {
      Authorization: `Bearer ${token}` 
    },
  });
  if (!response.ok) throw new Error("Failed to fetch parking lot");

  const data = await response.json();
  if (data.image) data.image = toDataUrl(data.image);
  return data;
};

// -------------------- GET ALL --------------------
export const getAllParkingLots = async () => {
    const token = localStorage.getItem('token');
  const response = await fetch("http://localhost:8000/api/parkingLots/all", {
    headers: {
      Authorization: `Bearer ${token}` 
    },
  });
  if (!response.ok) throw new Error("Failed to fetch parking lots");

  const data = await response.json();
  return data.map(lot => ({
    ...lot,
    image: toDataUrl(lot.image)
  }));
};

// -------------------- DELETE --------------------
export const deleteParkingLot = async (lotId) => {
    const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8000/api/parkingLots/delete/${lotId}`, {
    headers: {
      Authorization: `Bearer ${token}` 
    },
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Failed to delete parking lot");
  return true;
};

// -------------------- ALIASES --------------------
export const fetchParkingLots = getAllParkingLots;
export const fetchParkingLot = getParkingLot;
export const fetchParkingLotById = getParkingLot;
