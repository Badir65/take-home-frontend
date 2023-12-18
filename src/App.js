import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import "./App.css"
import Homes from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/news" element={<Homes />} />
      </Routes>
    </Router>
  );
};

export default App;