import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <motion.div
                className="col-md-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <div className="glass-panel p-5 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="mb-4"
                    >
                        <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: '80px', height: '80px' }}>
                            <FaUser size={35} color="#764ba2" />
                        </div>
                    </motion.div>

                    <h2 className="mb-4 fw-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Admin Access</h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="alert alert-danger rounded-3 border-0 shadow-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-start">
                            <label className="form-label text-white ms-1 fw-bold">Username</label>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-white"><FaUser color="#6c757d" /></span>
                                <input
                                    type="text"
                                    className="form-control border-0"
                                    name="username"
                                    placeholder="Enter admin ID"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 text-start">
                            <label className="form-label text-white ms-1 fw-bold">Password</label>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-white"><FaLock color="#6c757d" /></span>
                                <input
                                    type="password"
                                    className="form-control border-0"
                                    name="password"
                                    placeholder="Enter secure password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary w-100 shadow-lg"
                        >
                            <FaSignInAlt className="me-2" /> Login
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
