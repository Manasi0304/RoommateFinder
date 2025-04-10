import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RoommateProfile.css";

const RoommateProfile = () => {
  const { id } = useParams();
  const [roommate, setRoommate] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/roommate/${id}`)
      .then((res) => res.json())
      .then((data) => setRoommate(data))
      .catch((error) => console.error("Error fetching roommate:", error));
  }, [id]);

  if (!roommate) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <img src={`http://localhost:5000/${roommate.profilePhoto}`} alt={roommate.name} className="profile-photo" />
      <h2>{roommate.name}, {roommate.age}</h2>
      <p><strong>Occupation:</strong> {roommate.occupation}</p>
      <p><strong>Location:</strong> {roommate.location}</p>
      <p><strong>Current Stay:</strong> {roommate.currentStay}</p>
      <p><strong>Budget:</strong> ${roommate.budget}</p>
      <p><strong>Preferred Gender:</strong> {roommate.preferredGender}</p>
      <p><strong>Smoking:</strong> {roommate.smoking}</p>
      <p><strong>Drinking:</strong> {roommate.drinking}</p>
      <p><strong>Vegetarian:</strong> {roommate.vegetarian}</p>
      <p><strong>Pets:</strong> {roommate.pets}</p>
      <p><strong>Work From Home:</strong> {roommate.workFromHome ? "Yes" : "No"}</p>
      <p><strong>Languages Spoken:</strong> {roommate.languagesSpoken.join(", ")}</p>
      <p><strong>Hobbies:</strong> {roommate.hobbies.join(", ")}</p>
      <p><strong>About Me:</strong> {roommate.aboutMe}</p>
      <p><strong>Contact:</strong> {roommate.email} | {roommate.phone}</p>
    </div>
  );
};

export default RoommateProfile;