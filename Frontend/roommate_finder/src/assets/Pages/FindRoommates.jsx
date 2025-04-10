import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FindRoommates.css";

const FindRoommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [filteredRoommates, setFilteredRoommates] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    gender: "",
    minAge: "",
    maxAge: "",
    minBudget: "",
    maxBudget: "",
    smoking: "",
    drinking: "",
    vegetarian: "",
    pets: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/find-roommate")
      .then((res) => res.json())
      .then((data) => {
        setRoommates(data);
        setFilteredRoommates(data);
      })
      .catch((error) => console.error("Error fetching roommates:", error));
  }, []);

  const applyFilters = () => {
    let filtered = roommates.filter((roommate) => {
      return (
        (!filters.location || roommate.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.gender || roommate.gender === filters.gender) &&
        (!filters.minAge || roommate.age >= Number(filters.minAge)) &&
        (!filters.maxAge || roommate.age <= Number(filters.maxAge)) &&
        (!filters.minBudget || roommate.budget >= Number(filters.minBudget)) &&
        (!filters.maxBudget || roommate.budget <= Number(filters.maxBudget)) &&
        (!filters.smoking || roommate.smoking === filters.smoking) &&
        (!filters.drinking || roommate.drinking === filters.drinking) &&
        (!filters.vegetarian || roommate.vegetarian === filters.vegetarian) &&
        (!filters.pets || roommate.pets === filters.pets)
      );
    });

    setFilteredRoommates(filtered);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      gender: "",
      minAge: "",
      maxAge: "",
      minBudget: "",
      maxBudget: "",
      smoking: "",
      drinking: "",
      vegetarian: "",
      pets: "",
    });
    setFilteredRoommates(roommates);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="roommates-container">
      <h2>Find Your Perfect Roommate</h2>

      <div className="filters">
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />

        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="number" name="minAge" placeholder="Min Age" value={filters.minAge} onChange={handleFilterChange} />
        <input type="number" name="maxAge" placeholder="Max Age" value={filters.maxAge} onChange={handleFilterChange} />

        <input type="number" name="minBudget" placeholder="Min Budget" value={filters.minBudget} onChange={handleFilterChange} />
        <input type="number" name="maxBudget" placeholder="Max Budget" value={filters.maxBudget} onChange={handleFilterChange} />

        <select name="smoking" value={filters.smoking} onChange={handleFilterChange}>
          <option value="">Smoking</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Occasionally">Occasionally</option>
        </select>

        <select name="drinking" value={filters.drinking} onChange={handleFilterChange}>
          <option value="">Drinking</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Occasionally">Occasionally</option>
        </select>

        <select name="vegetarian" value={filters.vegetarian} onChange={handleFilterChange}>
          <option value="">Vegetarian</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select name="pets" value={filters.pets} onChange={handleFilterChange}>
          <option value="">Pets</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <div className="filter-buttons">
          <button onClick={applyFilters}>Apply Filters</button>
          <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
        </div>
      </div>

      <div className="roommate-list">
        {filteredRoommates.length === 0 ? (
          <p>No matching roommates found.</p>
        ) : (
          filteredRoommates.map((roommate) => (
            <div key={roommate._id} className="roommate-card">
              <img src={`http://localhost:5000/${roommate.profilePhoto}`} alt={roommate.name} className="roommate-photo" />
              <h3>{roommate.name}</h3>
              <p><strong>Age:</strong> {roommate.age}</p>
              <p><strong>Location:</strong> {roommate.location}</p>
              <p><strong>Budget:</strong> ${roommate.budget}</p>
              <Link to={`/roommate/${roommate._id}`} className="profile-link">View Profile</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindRoommates;