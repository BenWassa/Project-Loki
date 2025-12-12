import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnalyzerApp from './analyzer'
import Home from './pages/home.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<AnalyzerApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)