require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

const roommateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  profilePhoto: { type: String, default: "" },
  occupation: { type: String, default: "" },

  location: { type: String, required: true },
  currentStay: { type: String, required: true },

  preferredGender: { type: String, required: true, enum: ["Any", "Male", "Female"] },
  budget: { type: Number, required: true },
  stayDuration: { type: String, enum: ["Short-term", "Long-term", "Flexible"], default: "Flexible" },

  smoking: { type: String, required: true, enum: ["Yes", "No", "Occasionally"] },
  drinking: { type: String, required: true, enum: ["Yes", "No", "Occasionally"] },
  vegetarian: { type: String, required: true, enum: ["Yes", "No"] },
  pets: { type: String, required: true, enum: ["Yes", "No"] },
  workFromHome: { type: Boolean, default: false },

  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  socialMedia: {
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },

  languagesSpoken: { type: [String], default: [] },
  hobbies: { type: [String], default: [] },
  aboutMe: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
});

const Roommate = mongoose.model("Roommate", roommateSchema);

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route 1: Register Roommate
app.post("/register-roommate", upload.single("profilePhoto"), async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      occupation,
      location,
      currentStay,
      preferredGender,
      budget,
      stayDuration,
      smoking,
      drinking,
      vegetarian,
      pets,
      workFromHome,
      email,
      phone,
      instagram,
      linkedin,
      languagesSpoken,
      hobbies,
      aboutMe
    } = req.body;

    const newRoommate = new Roommate({
      name,
      age,
      gender,
      profilePhoto: req.file ? req.file.path : "",
      occupation,
      location,
      currentStay,
      preferredGender,
      budget,
      stayDuration,
      smoking,
      drinking,
      vegetarian,
      pets,
      workFromHome: workFromHome === "true",
      email,
      phone,
      socialMedia: { instagram, linkedin },
      languagesSpoken: languagesSpoken ? languagesSpoken.split(",") : [],
      hobbies: hobbies ? hobbies.split(",") : [],
      aboutMe
    });

    await newRoommate.save();
    res.status(201).json({ message: "Roommate added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route 2: Get all roommates
app.get("/find-roommate", async (req, res) => {
  try {
    const roommates = await Roommate.find();
    res.json(roommates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route 3: Get roommate by ID
app.get("/roommate/:id", async (req, res) => {
  try {
    const roommate = await Roommate.findById(req.params.id);
    if (!roommate) {
      return res.status(404).json({ message: "Roommate not found" });
    }
    res.json(roommate);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// app.get("/matched-roommates/:userId", async (req, res) => {
//   try {
//     const user = await Roommate.findById(req.params.userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Filtering logic
//     const matchedRoommates = await Roommate.find({
//       _id: { $ne: user._id }, // Exclude the logged-in user
//       preferredGender: user.gender, // Match gender preference
//       budget: { $gte: user.budget - 500, $lte: user.budget + 500 }, // Budget flexibility
//       location: user.location, // Match location
//       smoking: user.smoking, // Match smoking preference
//       drinking: user.drinking, // Match drinking preference
//       vegetarian: user.vegetarian, // Match diet preference
//       pets: user.pets, // Match pet preference
//       workFromHome: user.workFromHome, // Work from home compatibility
//     });

//     res.json(matchedRoommates);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));