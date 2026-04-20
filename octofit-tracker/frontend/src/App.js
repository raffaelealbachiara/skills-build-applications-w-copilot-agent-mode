import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Teams from './components/Teams';
import Users from './components/Users';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo.png" alt="OctoFit Logo" />
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👥 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👤 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    ⚡ Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1>🐙 Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your fitness activities, compete with teams, and achieve your goals!</p>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">👥 Teams</h5>
            </div>
            <div className="card-body">
              <p className="card-text">View and manage teams. Connect with other fitness enthusiasts and collaborate.</p>
              <Link to="/teams" className="btn btn-primary btn-sm">
                View Teams
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">⚡ Activities</h5>
            </div>
            <div className="card-body">
              <p className="card-text">Log and track your workouts. Monitor progress and earn points.</p>
              <Link to="/activities" className="btn btn-primary btn-sm">
                View Activities
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">🏆 Leaderboard</h5>
            </div>
            <div className="card-body">
              <p className="card-text">Check the rankings and see where you stand against other competitors.</p>
              <Link to="/leaderboard" className="btn btn-primary btn-sm">
                View Rankings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
