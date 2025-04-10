// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddJob from './pages/addJob';
import AllJobs from './pages/allJobs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddJob />} />
        <Route path="/all-jobs" element={<AllJobs />} />
      </Routes>
    </Router>
  );
};

export default App;
