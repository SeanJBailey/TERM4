import React, { useState, useEffect} from 'react';
import '../styles/Profile.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import calender_icon from '../assets/calendar.png';
import phone_icon from '../assets/phone.png';
import person from '../assets/person.png';
import profile_icon from '../assets/profileIMG.png';
import gender_icon from '../assets/gender.png';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    dob: "",
    gender: "",
    userName: "",
    email: "",
    profileImage: null,
    password: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userID = localStorage.getItem("userID");
      if (!userID) return;

      try {
        const response = await fetch(`http://localhost:8080/user/getUser/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            contactNumber: data.contactNumber,
            dob: data.dob,
            gender: data.gender,
            userName: data.userName,
            email: data.email,
            profileImage: data.profileImage,
            password: data.password
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const HandleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      profileImageFile:file,
      profilePreview: URL.createObjectURL(file)
    })  ;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userID = localStorage.getItem("userID");
    if (!userID) return;

    // must send as FormData to handle Image as bytes, JSON cannot handle this
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
      const response = await fetch("http://localhost:8080/user/update", {
        method: "PUT",
        body: data,
      });

      const result = await response.json();
      console.log("Update response:", result);

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Update failed. Check console for details.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Please try again.");
    }
};


  return(
    <div className="container">
      <div className="header"> 
        <div className='text'>Profile</div>
        <div className='underline'></div>
      </div>

      <div className ="ProfileIMG">
        <input
          type="file" 
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={HandleImageUpload}
        />
        <img src={formData.profilePreview || profile_icon} alt="ProfileImage"
        onClick={() => {document.getElementById('fileInput').click();}}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt=""/>
            <input 
              type="text" 
              name="name"
              value={formData.name}
               onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>

          <div className="input">
            <img src={phone_icon} alt=""/>
            <input 
              type="tel" 
              name="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>
          
          <div className="input">
            <img src={calender_icon} alt=""/>
            <input 
              type="date" 
              name="dob"
              value={formData.dob}
               onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>

          <div className="input">
            <img src={gender_icon} alt=""/>
            <input 
              type="text" 
              name="gender"
              value={formData.gender}
               onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>

          <div className="input">
            <img src={person} alt=""/>
            <input 
              type="text" 
              name="userName"
              value={formData.userName}
               onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>

          <div className="input">
            <img src={email_icon} alt=""/>
            <input 
              type="email" 
              name="email"
              value={formData.email}
               onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt=""/>
            <input 
              type="password" 
              name="password"
              value={formData.password}
               onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="ProfileButtons">
            <button type="submit" className = "ProfileButton confirm">Confirm Changes</button>
          <Link to="/logout">
            <button type="button" className= "ProfileButton logout">Logout</button>
          </Link>
        </div>
      </form>

      {/* <div className="switch-form">
        Already have an account? <Link to="/login">Login</Link>
      </div> */}
    </div>
)};

export default Profile;