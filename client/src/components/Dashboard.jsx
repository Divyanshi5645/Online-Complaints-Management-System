import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { motion } from 'framer-motion';
import { FaClipboardList, FaClock, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await axios.get('/api/complaints');
            setComplaints(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Status Change
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.patch(`/api/complaints/${id}`, { status: newStatus });
            // Optimistic Update
            setComplaints(complaints.map(c => c._id === id ? { ...c, status: newStatus } : c));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    };

    // Prepare Chart Data
    const statusCounts = complaints.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
    }, {});

    const categoryCounts = complaints.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
    }, {});

    const statusData = {
        labels: Object.keys(statusCounts),
        datasets: [{
            label: '# of Complaints',
            data: Object.values(statusCounts),
            backgroundColor: ['#ffc107', '#17a2b8', '#28a745', '#6c757d'],
            borderRadius: 10,
        }]
    };

    const categoryData = {
        labels: Object.keys(categoryCounts),
        datasets: [{
            label: 'Category Distribution',
            data: Object.values(categoryCounts),
            backgroundColor: ['#007bff', '#6610f2', '#e83e8c', '#fd7e14'],
            hoverOffset: 4
        }]
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="mb-0 fw-bold text-white"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                >
                    <FaClipboardList className="me-2" /> Admin Dashboard
                </motion.h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className="btn btn-danger shadow-sm border-0 px-4"
                >
                    Logout
                </motion.button>
            </div>

            {/* Summary Cards */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="row mb-4"
            >
                <motion.div variants={item} className="col-md-3">
                    <div className="glass-card p-3 text-center h-100">
                        <div className="text-secondary fw-bold mb-1">Total Complaints</div>
                        <h2 className="display-4 fw-bold text-primary mb-0">{complaints.length}</h2>
                    </div>
                </motion.div>
                <motion.div variants={item} className="col-md-3">
                    <div className="glass-card p-3 text-center h-100" style={{ borderLeft: '5px solid #ffc107' }}>
                        <div className="text-secondary fw-bold mb-1"><FaExclamationTriangle className="text-warning me-2" />Pending</div>
                        <h2 className="display-4 fw-bold text-dark mb-0">{statusCounts['Pending'] || 0}</h2>
                    </div>
                </motion.div>
                <motion.div variants={item} className="col-md-3">
                    <div className="glass-card p-3 text-center h-100" style={{ borderLeft: '5px solid #17a2b8' }}>
                        <div className="text-secondary fw-bold mb-1"><FaSpinner className="text-info me-2" />In Progress</div>
                        <h2 className="display-4 fw-bold text-dark mb-0">{statusCounts['In Progress'] || 0}</h2>
                    </div>
                </motion.div>
                <motion.div variants={item} className="col-md-3">
                    <div className="glass-card p-3 text-center h-100" style={{ borderLeft: '5px solid #28a745' }}>
                        <div className="text-secondary fw-bold mb-1"><FaCheckCircle className="text-success me-2" />Resolved</div>
                        <h2 className="display-4 fw-bold text-dark mb-0">{statusCounts['Resolved'] || 0}</h2>
                    </div>
                </motion.div>
            </motion.div>

            <div className="row mb-5">
                <div className="col-md-6 mb-3">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-panel p-4 h-100">
                        <h5 className="mb-3 text-white fw-bold">Status Overview</h5>
                        <Bar data={statusData} />
                    </motion.div>
                </div>
                <div className="col-md-6 mb-3">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="glass-panel p-4 h-100">
                        <h5 className="mb-3 text-white fw-bold">Category Distribution</h5>
                        <div style={{ maxHeight: '300px', display: 'flex', justifyContent: 'center' }}>
                            <Pie data={categoryData} />
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="glass-panel-dark p-4">
                <h4 className="mb-4 text-white fw-bold">Recent Complaints</h4>
                <div className="table-responsive">
                    <table className="table table-hover text-white align-middle" style={{ backgroundColor: 'transparent' }}>
                        <thead className="text-white border-bottom border-light">
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                            </tr>
                        </thead>
                        <tbody className="border-top-0">
                            {complaints.map(c => (
                                <motion.tr
                                    key={c._id}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <td className="fw-medium">{c.title}</td>
                                    <td><span className="badge bg-light text-dark shadow-sm">{c.category}</span></td>
                                    <td>
                                        <span className={`badge shadow-sm bg-${c.priority === 'High' ? 'danger' : c.priority === 'Medium' ? 'warning' : 'success'}`}>
                                            {c.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm border-0 shadow-sm fw-bold"
                                            value={c.status}
                                            onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                            style={{
                                                backgroundColor: c.status === 'Resolved' ? '#d4edda' :
                                                    c.status === 'In Progress' ? '#d1ecf1' :
                                                        c.status === 'Closed' ? '#e2e3e5' : '#fff3cd',
                                                color: '#333'
                                            }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </td>
                                    <td className="fw-bold" style={{ color: '#ffd700' }}>{c.assignedTo || 'General Desk'}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
