import React, { useState } from 'react';
import '../../styles/LoginSignup.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import calender_icon from '../../assets/calendar.png';
import phone_icon from '../../assets/phone.png';
import profile_icon from '../../assets/profile.png';
import gender_icon from '../../assets/gender.png';
import { Link, replace } from 'react-router-dom';
import {SignUp} from '../../../API/userApi';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onLogin }) => { 
  const navigate = useNavigate();

  // Defines a Signup component with state for all the form fields. As the user types,
  // formData will hold the latest values, and setFormData will update them.
  const [formData, setFormData] = useState({ //represents all input fields in signup form, initlazises state of formdata
    name: '',
    contactNumber: '',
    dob: '',
    gender: '',
    userName: '',
    email: '',
    password: ''
  });

  // function to handle input changes and update formData state, saves in each field as user types
  const handleChange = (e) => {
    setFormData({ // updates formData state with new input values
      ...formData, // copys everything currently in formData so no data is lost //... spread operator
      [e.target.name]: e.target.value // name of attribute(ex email) //value is the new value entered by user
    });
  };

  const handleSubmit = async (e) => { // arrow function to handle form submission
    e.preventDefault(); // stops the default form submission behavior

    try {
      await SignUp(formData);
      alert('Signup successful! You can now log in.');
      navigate('/login', {replace: true}); // replace true so user cant go back to signup page
    } catch (error) {
      console.error(error);
      alert('Signup error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="header"> 
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt=""/>
            <input 
              type="text" 
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={phone_icon} alt=""/>
            <input 
              type="tel" 
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input">
            <img src={calender_icon} alt=""/>
            <input 
              type="date" 
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={gender_icon} alt=""/>
            <input 
              type="text" 
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={profile_icon} alt=""/>
            <input 
              type="text" 
              name="userName"
              placeholder="User Name"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={email_icon} alt=""/>
            <input 
              type="email" 
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt=""/>
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className='submit-container'>
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>

      <div className="switch-form">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;