import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Leaderboard from './pages/Leaderboard';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/contact"     element={<ContactUs />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about"       element={<AboutUs />} />
        <Route path="/profile"     element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;