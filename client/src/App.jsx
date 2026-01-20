import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComplaintForm from './components/ComplaintForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark navbar-glass mb-4 shadow-sm sticky-top">
          <div className="container">
            <Link className="navbar-brand" to="/">Smart OCMS</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Submit Complaint</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<ComplaintForm />} />
            <Route path="/login" element={<Login />} />

            {/* Private Admin Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
