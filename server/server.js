// Online Complaints Management System - Server Entry
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ocms';
console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected successfully to:', mongoURI.split('@')[1] || 'local'))
    .catch(err => {
        console.error('CRITICAL: MongoDB Connection Error:', err.message);
        // Ensure server doesn't just hang if DB is down
    });

mongoose.connection.on('error', (err) => console.error('Mongoose Connection Event Error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose Disconnected from DB'));

// Routes
const complaintRoutes = require('./routes/complaints');
const authRoutes = require('./routes/auth');

app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'OCMS API is functional' });
});

// Base Route
app.get('/', (req, res) => {
    res.send('OCMS API is running');
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
