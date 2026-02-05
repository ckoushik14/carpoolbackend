const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ REPLACE WITH YOUR REAL ATLAS STRING
mongoose.connect('mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/rideapp?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Mongo Error:', err));

// Routes
app.use('/api/rides', require('./routes/rides'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
