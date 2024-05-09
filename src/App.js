import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Account from './components/Account';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">TASK MANAGEMENT APP</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/account'>Account</Link>
                  </li>
                   {/* Conditional rendering for Dashboard link */}
                   {isAuthenticated && <li className='nav-item'><Link className='nav-link' to='/dashboard'>Dashboard</Link></li>}
                  <li className='nav-item'>
                    <Link className='nav-link' to='/logout'>Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {isAuthenticated && <Route path='/account' element={<Account />} />}
          <Route path='/logout' element={<Logout />} />
          {/* Route for Dashboard component */}
          {isAuthenticated && <Route path='/dashboard' element={<Dashboard />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
