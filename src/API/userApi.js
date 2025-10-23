import userEvent from "@testing-library/user-event";
import { Form } from "react-router-dom";
import index from "../components/navbar";  
// src/api/user.api.js

// to login user and store userID in localStorage
// Handles login
export const login = async (credentials) => {
  const response = await fetch('http://localhost:8080/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok || !data.userID) {
    throw new Error(data.message || 'Login failed');
  }

  // Save token + userID
  if (data.token) localStorage.setItem('token', data.token);
  localStorage.setItem('userID', data.userID);

  // Call getUser
  return await getUser(data.userID, data.token);
};
// Handles signup
export const SignUp = async (credentials) => {
  const response = await fetch('http://localhost:8080/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok || !data.userID) {
    throw new Error(data.message ||'Signup failed');
  }

  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  localStorage.setItem('userID', data.userID);
  
};

// Retrieves logged-in user info
export const getUser = async (userID, token) => {
  if (!userID || !token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`http://localhost:8080/user/getUser/${userID}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const data = await response.json();
  //converts image from bytes to base64
  data.profileImage = convertImageToBase64(data.profileImage);

  localStorage.setItem('profileImage', data.profileImage || '');
  return data;
}

// Update user profile
export const update = async (formData) => {
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');

  //Check for missing authentication
  if (!token || !userID) throw new Error("Not authenticated");

  const response = await fetch('http://localhost:8080/user/update', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`, // include JWT
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Update failed');
  }

  
  const data = await response.json();
  
  return data;
}

export const convertImageToBase64 = (image) => {
  if (!image) return null;

  if (image.data) { 
    const bytes = image.data;
    const base64String = btoa(
      new Uint8Array(bytes).reduce((acc, byte) => acc + String.fromCharCode(byte), "")
    );
    return `data:image/jpeg;base64,${base64String}`;
  } else if (typeof image === "string") {
    return `data:image/jpeg;base64,${image}`;
  }

  return null;
}

