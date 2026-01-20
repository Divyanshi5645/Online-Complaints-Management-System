import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEdit, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'IT',
        priority: 'Medium',
        email: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/complaints', formData);
            setMessage('Complaint submitted successfully!');
            setFormData({ title: '', description: '', category: 'IT', priority: 'Medium', email: '' });
        } catch (err) {
            setMessage('Error submitting complaint.');
            console.error(err);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-md-8 col-lg-6"
            >
                <div className="glass-panel p-5">
                    <h2 className="mb-4 text-center fw-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        <FaEdit className="me-2" />Submit a Complaint
                    </h2>

                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} shadow-sm`}
                        >
                            {message}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label text-white fw-bold">Title</label>
                            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required placeholder="Brief title of the issue" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-white fw-bold">Email</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-0"><FaEnvelope color="#6c757d" /></span>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required placeholder="Your contact email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label text-white fw-bold">Category</label>
                                <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                                    <option value="IT">IT (Hardware/Network)</option>
                                    <option value="HR">HR (Queries/Issues)</option>
                                    <option value="Admin">Admin (Facilities)</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label text-white fw-bold">Priority</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-0"><FaExclamationCircle color="#6c757d" /></span>
                                    <select className="form-select" name="priority" value={formData.priority} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-white fw-bold">Description</label>
                            <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} required placeholder="Describe the issue in detail..."></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="btn btn-primary w-100 py-3 shadow-lg fs-5"
                        >
                            <FaPaperPlane className="me-2" /> Submit Complaint
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ComplaintForm;
