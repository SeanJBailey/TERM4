import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import calender_icon from "../assets/calendar.png";
import phone_icon from "../assets/phone.png";
import person from "../assets/person.png";
import profile_icon from "../assets/profileIMG.png";
import gender_icon from "../assets/gender.png";
import { Link } from "react-router-dom";
import {getUser, update} from '../../API/userApi';

const Profile = ({onLogout}) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    dob: "",
    gender: "",
    userName: "",
    email: "",
    password: "",
    profileImage: null,       // backend/base64
    profilePreview: null,     // local uploaded preview
    profileImageFile: null,   // uploaded file
  });

  useEffect(() => {
  const fetchUserData = async () => {
    const userID = localStorage.getItem("userID");
    if (!userID) return;

    try {
      const data = await getUser();
      
      setFormData({
        name: data.name || "",
        contactNumber: data.contactNumber || "",
        dob: data.dob || "",
        gender: data.gender || "",
        userName: data.userName || "",
        email: data.email || "",
        password: data.password || "",
        profileImage: data.profileImage || profile_icon,
        profilePreview: null,
        profileImageFile: null,
      });

      localStorage.setItem("profileImage", data.profileImage || "");
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  fetchUserData();
}, []);

  const HandleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImageFile: file,
      profilePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userID = localStorage.getItem("userID");
    if (!userID)return;

    const data = new FormData();
    data.append("userID", userID);
    data.append("name", formData.name);
    data.append("contactNumber", formData.contactNumber);
    data.append("dob", formData.dob);
    data.append("gender", formData.gender);
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.profileImageFile) {
      data.append("profileImage", formData.profileImageFile);
    }

    try {
      const response = await update(data);
      console.log("Update response:", response);

      if (response.ok) alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Profile</div>
        <div className="underline"></div>
      </div>

      <div className="ProfileIMG">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={HandleImageUpload}
        />
        <img
          src={formData.profilePreview || formData.profileImage || profile_icon}
          alt="ProfileImage"
          onClick={() => document.getElementById("fileInput").click()}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {[
            { icon: user_icon, name: "name", type: "text" },
            { icon: phone_icon, name: "contactNumber", type: "tel" },
            { icon: calender_icon, name: "dob", type: "date" },
            { icon: gender_icon, name: "gender", type: "text" },
            { icon: person, name: "userName", type: "text" },
            { icon: email_icon, name: "email", type: "email" },
            { icon: password_icon, name: "password", type: "password" },
          ].map((field) => (
            <div className="input" key={field.name}>
              <img src={field.icon} alt="" />
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
          ))}
        </div>

        <div className="ProfileButtons">
          <button type="submit" className="ProfileButton confirm">
            Confirm Changes
          </button>
            <button type="button" className="ProfileButton logout" onClick={onLogout}>
              Logout
            </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;