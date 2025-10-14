import React, { useState } from "react";
import "../styles/Vehicles.css";

export default function Vehicles() {
  const [formData, setFormData] = useState({
    licensePlate: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleColour: "",
    vehicleVIN: "",
    vehicleImage: null, // actual file
    imagePreview: null, // local preview
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        vehicleImage: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // use FormData for files + text data
      const data = new FormData();
      data.append("licensePlate", formData.licensePlate);
      data.append("vehicleMake", formData.vehicleMake);
      data.append("vehicleModel", formData.vehicleModel);
      data.append("vehicleColour", formData.vehicleColour);
      data.append("vehicleVIN", formData.vehicleVIN);
      if (formData.vehicleImage) {
        data.append("vehicleImage", formData.vehicleImage);
      }

      const response = await fetch("http://localhost:8080/api/vehicle/create", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Vehicle saved successfully:", result);
        alert("Vehicle added successfully!");
        setFormData({
          licensePlate: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleColour: "",
          vehicleVIN: "",
          vehicleImage: null,
          imagePreview: null,
        });
      } else {
        console.error("Failed to save vehicle");
        alert("Failed to save vehicle. Check backend logs.");
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert("Error connecting to server. Is it running?");
    }
  };

  return (
    <div className="vehicle-container">
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <h1 className="vehicle-title">Vehicle Entry</h1>

        <div className="vehicle-grid">
          <div className="vehicle-field">
            <label>License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="CA 123 456"
              required
            />
          </div>

          <div className="vehicle-field">
            <label>Vehicle Make</label>
            <input
              type="text"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              placeholder="Toyota"
              required
            />
          </div>

          <div className="vehicle-field">
            <label>Vehicle Model</label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="Corolla Quest 1.6"
              required
            />
          </div>

          <div className="vehicle-field">
            <label>Vehicle Colour</label>
            <input
              type="text"
              name="vehicleColour"
              value={formData.vehicleColour}
              onChange={handleChange}
              placeholder="White"
              required
            />
          </div>

          <div className="vehicle-field">
            <label>Vehicle VIN</label>
            <input
              type="text"
              name="vehicleVIN"
              value={formData.vehicleVIN}
              onChange={handleChange}
              placeholder="1HGCM82633A004352"
              required
            />
          </div>

          <div className="vehicle-field">
            <label>Vehicle Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {formData.imagePreview && (
            <div className="vehicle-preview">
              <img
                src={formData.imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "auto", marginTop: "10px" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="vehicle-button">
          CONFIRM
        </button>
      </form>
    </div>
  );
}
