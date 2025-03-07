import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home.js'
import Register from './components/Register.js'
import Dashboard from './components/Dashboard.js'
import AddContact from './components/AddContact.js'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-contact" element={<AddContact />} />
    </Routes>
  </Router>
)

export default App