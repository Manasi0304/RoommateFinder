import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterRoommate.css";

const RegisterRoommate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    profilePhoto: null,
    occupation: "",
    location: "",
    currentStay: "",
    preferredGender: "Any",
    budget: "",
    stayDuration: "Flexible",
    smoking: "No",
    drinking: "No",
    vegetarian: "No",
    pets: "No",
    workFromHome: false,
    email: "",
    phone: "",
    instagram: "",
    linkedin: "",
    languagesSpoken: "",
    hobbies: "",
    aboutMe: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      await axios.post("http://localhost:5000/register-roommate", form);
      alert("Roommate added successfully!");

      setTimeout(() => {
        navigate("/your-profile");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register You as Roommate</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        <div className="input-group">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Gender:</label>
          <select name="gender" onChange={handleChange} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} />
        </div>

        <div className="input-group">
          <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} />
          <input type="text" name="location" placeholder="Current Location" onChange={handleChange} required />
        </div>

        <input type="text" name="currentStay" placeholder="Current Stay (PG, Rented Apartment, etc.)" onChange={handleChange} required />

        <div className="input-group">
          <label>Preferred Gender:</label>
          <select name="preferredGender" onChange={handleChange} required>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="input-group">
          <label>Budget:</label>
          <input type="number" name="budget" placeholder="per month" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Stay Duration:</label>
          <select name="stayDuration" onChange={handleChange}>
            <option value="Flexible">Flexible</option>
            <option value="Short-term">Short-term</option>
            <option value="Long-term">Long-term</option>
          </select>
        </div>

        <div className="preferences">
          <label>Smoking:</label>
          <select name="smoking" onChange={handleChange} required>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Occasionally">Occasionally</option>
          </select>

          <label>Drinking:</label>
          <select name="drinking" onChange={handleChange} required>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Occasionally">Occasionally</option>
          </select>

          <label>Vegetarian:</label>
          <select name="vegetarian" onChange={handleChange} required>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

          <label>Pets:</label>
          <select name="pets" onChange={handleChange} required>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <label className="checkbox">
          <input type="checkbox" name="workFromHome" onChange={handleChange} />
          Work From Home
        </label>

        <div className="input-group">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        </div>

        <input type="text" name="instagram" placeholder="Instagram Profile (optional)" onChange={handleChange} />
        <input type="text" name="linkedin" placeholder="LinkedIn Profile (optional)" onChange={handleChange} />

        <input type="text" name="languagesSpoken" placeholder="Languages Spoken (comma separated)" onChange={handleChange} />
        <input type="text" name="hobbies" placeholder="Hobbies (comma separated)" onChange={handleChange} />

        <textarea name="aboutMe" placeholder="Tell us about yourself..." onChange={handleChange}></textarea>

        <button type="submit">Register as Roommate</button>
      </form>
    </div>
  );
};

export default RegisterRoommate;