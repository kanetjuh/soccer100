import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import { MatchProvider } from './context/MatchContext';

function App() {
  return (
    <Router>
      <MatchProvider>
        <div className="min-h-screen bg-[#0f1214] text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/match/:league/:teams/:id" element={<MatchDetailsPage />} />
          </Routes>
        </div>
      </MatchProvider>
    </Router>
  );
}

export default App;