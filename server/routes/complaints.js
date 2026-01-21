const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const assignOfficer = require('../utils/assignmentEngine');

// GET all complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single complaint
router.get('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.json(complaint);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create complaint
router.post('/', async (req, res) => {
    try {
        const { title, description, category, email, priority } = req.body;

        // Smart Assignment Logic
        const assignedOfficer = assignOfficer(category);

        const newComplaint = new Complaint({
            title,
            description,
            category,
            email,
            priority,
            assignedTo: assignedOfficer
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update status
router.patch('/:id', async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.json(updatedComplaint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
