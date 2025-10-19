// src/components/ParkingLotForm.js
import React, { useState, useEffect } from "react";
import { createParkingLot, updateParkingLot } from "../../API/parkingApi";
import "../styles/ParkingLot.css";

export default function ParkingLotForm({ initial, onSuccess }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [pricePerHour, setPricePerHour] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form with initial values (for editing)
  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setLocation(initial.location || "");
      setOpenTime(initial.openTime || "");
      setClosingTime(initial.closingTime || "");
      setPricePerHour(initial.pricePerHour || 0);
      setImageFile(null);
      setImagePreview(initial.imagePath ? `http://localhost:8080${initial.imagePath}` : null);
    } else {
      setTitle(""); setLocation(""); setOpenTime(""); setClosingTime(""); setPricePerHour(0);
      setImageFile(null); setImagePreview(null);
    }
  }, [initial]);

  // Simple validation
  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!location.trim()) return "Location is required";
    if (!openTime.trim()) return "Open time is required";
    if (!closingTime.trim()) return "Closing time is required";
    if (pricePerHour < 0) return "Price per hour must be >= 0";
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("location", location.trim());
    formData.append("openTime", openTime.trim());
    formData.append("closingTime", closingTime.trim());
    formData.append("pricePerHour", pricePerHour);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (initial && initial.lotId) {
        // Workaround for multipart PUT
        formData.append("_method", "PUT");
        await updateParkingLot(initial.lotId, formData);
      } else {
        await createParkingLot(formData);
      }

      // Reset form
      setTitle(""); setLocation(""); setOpenTime(""); setClosingTime(""); setPricePerHour(0);
      setImageFile(null); setImagePreview(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="parking-form-container">
      <h3>{initial ? "Edit Parking Lot" : "Create Parking Lot"}</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="parking-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
        <input type="text" value={openTime} onChange={e => setOpenTime(e.target.value)} placeholder="Open Time" />
        <input type="text" value={closingTime} onChange={e => setClosingTime(e.target.value)} placeholder="Closing Time" />
        <input type="number" step="0.01" value={pricePerHour} onChange={e => setPricePerHour(Number(e.target.value))} placeholder="Price Per Hour" />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" style={{ width: "150px", marginTop: "10px", borderRadius: "5px" }} />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : (initial ? "Update" : "Create")}
        </button>
      </form>
    </div>
  );
}
