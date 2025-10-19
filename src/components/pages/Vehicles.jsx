<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 096e576b0da8d7e4479f85ff12ce6f31ef885fcb
import "../styles/Vehicles.css";

export default function Vehicles() {
  const [formData, setFormData] = useState({
    licensePlate: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleColour: "",
    vehicleVIN: "",
<<<<<<< HEAD
    vehicleImage: null, 
    imagePreview: null, 
=======
    vehicleImage: null,
    imagePreview: null,
>>>>>>> 096e576b0da8d7e4479f85ff12ce6f31ef885fcb
  });

  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/vehicle/all");
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        console.error("Failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
<<<<<<< HEAD
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
=======
  const file = e.target.files[0];
  if (file) {
    setFormData((prev) => ({
      ...prev,
      vehicleImage: file, 
      imagePreview: URL.createObjectURL(file), 
    }));
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    
    if (editingId) data.append("vehicleId", editingId); 

    data.append("licensePlate", formData.licensePlate);
    data.append("vehicleMake", formData.vehicleMake);
    data.append("vehicleModel", formData.vehicleModel);
    data.append("vehicleColour", formData.vehicleColour);
    data.append("vehicleVIN", formData.vehicleVIN);

    if (formData.vehicleImage) {
      data.append("vehicleImage", formData.vehicleImage);
    }

    const url = editingId
      ? "http://localhost:8080/api/vehicle/update"
      : "http://localhost:8080/api/vehicle/create";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, { method, body: data });

    if (response.ok) {
      alert(editingId ? "Vehicle updated!" : "Vehicle added!");
      setFormData({
        licensePlate: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleColour: "",
        vehicleVIN: "",
        vehicleImage: null,
        imagePreview: null,
      });
      setEditingId(null);
      fetchVehicles();
    } else {
      alert("Failed to save vehicle. Check backend logs.");
    }
  } catch (error) {
    console.error("Error saving vehicle:", error);
    alert("Error connecting to server. Is it running?");
  }
};

  const handleDelete = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/vehicle/delete/${vehicleId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Vehicle deleted!");
        fetchVehicles();
      } else {
        alert("Failed to delete vehicle.");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
>>>>>>> 096e576b0da8d7e4479f85ff12ce6f31ef885fcb
    }
  };

  const handleEdit = (vehicle) => {
  setEditingId(vehicle.vehicleId);

  setFormData({
    licensePlate: vehicle.licensePlate,
    vehicleMake: vehicle.vehicleMake,
    vehicleModel: vehicle.vehicleModel,
    vehicleColour: vehicle.vehicleColour,
    vehicleVIN: vehicle.vehicleVIN,
    vehicleImage: null, // No new file yet
    imagePreview: vehicle.vehicleImage
      ? `http://localhost:8080${vehicle.vehicleImage}` 
      : null,
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <div className="vehicle-container">
<<<<<<< HEAD
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

=======
      {/* ===== Add or Update Form ===== */}
      <div className="vehicle-form">
        <h1 className="vehicle-title">
          {editingId ? "Edit Vehicle" : "Add New Vehicle"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="vehicle-grid">
            <div className="vehicle-field">
              <label>License Plate</label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
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
                required
              />
            </div>

            <div className="vehicle-field">
              <label>Vehicle Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

>>>>>>> 096e576b0da8d7e4479f85ff12ce6f31ef885fcb
          {formData.imagePreview && (
            <div className="vehicle-preview">
              <img
                src={formData.imagePreview}
                alt="Preview"
<<<<<<< HEAD
                style={{ width: "200px", height: "auto", marginTop: "10px" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="vehicle-button">
          CONFIRM
        </button>
      </form>
=======
                style={{ width: "200px", marginTop: "10px" }}
              />
            </div>
          )}

          <button type="submit" className="vehicle-button">
            {editingId ? "UPDATE VEHICLE" : "CONFIRM"}
          </button>
        </form>
      </div>

      {/* ===== Manage Vehicles Section ===== */}
      <div className="manage-container">
        <h2 className="vehicle-title">Manage Vehicles</h2>
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>License Plate</th>
              <th>Make</th>
              <th>Model</th>
              <th>Colour</th>
              <th>VIN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((v) => (
                <tr key={v.vehicleId}>
                  <td>
                    {v.vehicleImage ? (
                      <img
                        src={`http://localhost:8080${v.vehicleImage}`}
                        alt="Vehicle"
                        style={{ width: "80px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{v.licensePlate}</td>
                  <td>{v.vehicleMake}</td>
                  <td>{v.vehicleModel}</td>
                  <td>{v.vehicleColour}</td>
                  <td>{v.vehicleVIN}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(v)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(v.vehicleId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
>>>>>>> 096e576b0da8d7e4479f85ff12ce6f31ef885fcb
    </div>
  );
}
