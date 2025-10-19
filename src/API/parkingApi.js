// Helper: ensures a valid data URL for images
const toDataUrl = (image) => {
  if (!image) return null;
  // If already a proper data URL, return as-is
  if (typeof image === 'string') {
    if (image.startsWith('data:')) return image;
    // If plain base64 string, prefix it
    if (/^[A-Za-z0-9+/=\s]+$/.test(image)) return `data:image/jpeg;base64,${image}`;
    return image; // fallback for URLs
  }
  return null; // invalid type
};

// CREATE
export const createParkingLot = async (formData) => {
  const response = await fetch("http://localhost:8080/api/parkingLots/create", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData || "Failed to create parking lot");
  }

  const data = await response.json();
  if (data.image) data.image = toDataUrl(data.image);
  return data;
};

// UPDATE
export const updateParkingLot = async (lotId, formData) => {
  const response = await fetch(`http://localhost:8080/api/parkingLots/update/${lotId}`, {
    method: "POST", // multipart workaround for PUT
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData || "Failed to update parking lot");
  }

  const data = await response.json();
  if (data.image) data.image = toDataUrl(data.image);
  return data;
};

// GET ONE
export const getParkingLot = async (lotId) => {
  const response = await fetch(`http://localhost:8080/api/parkingLots/read/${lotId}`);
  if (!response.ok) throw new Error("Failed to fetch parking lot");

  const data = await response.json();
  if (data.image) data.image = toDataUrl(data.image);
  return data;
};

// GET ALL
export const getAllParkingLots = async () => {
  const response = await fetch("http://localhost:8080/api/parkingLots/all");
  if (!response.ok) throw new Error("Failed to fetch parking lots");

  const data = await response.json();
  return data.map(lot => ({
    ...lot,
    image: toDataUrl(lot.image)
  }));
};

// DELETE
export const deleteParkingLot = async (lotId) => {
  const response = await fetch(`http://localhost:8080/api/parkingLots/delete/${lotId}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Failed to delete parking lot");

  return true;
};

// Aliases for backward compatibility
export const fetchParkingLots = getAllParkingLots;
export const fetchParkingLot = getParkingLot;
export const fetchParkingLotById = getParkingLot;
