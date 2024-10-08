
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 2447;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://denismwai898:iamblessed@cluster0.lrfu8nl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
}).then(
    () => {
    console.log("Connection successful");
}).catch((e) => {
    console.error(e);
});

const bmiSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  bmi: Number,
  createdAt: { type: Date, default: Date.now },
});

const BMI = mongoose.model('BMI', bmiSchema);

// Routes
app.post('/api/bmi', async (req, res) => {
  const { height, weight, bmi } = req.body;
  try {
    const newBMI = new BMI({ height, weight, bmi });
    await newBMI.save();
    res.status(201).json(newBMI);
  } catch (error) {
    res.status(400).json({ message: 'Error saving data', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});// Route to get all BMI records (History)
app.get('/api/bmi/history', async (req, res) => {
  try {
    const bmiRecords = await BMI.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json(bmiRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error });
  }
});

