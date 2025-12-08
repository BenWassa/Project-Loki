import React from 'react'
import ReactDOM from 'react-dom/client'
import AnalyzerApp from './analyzer/pages/analyzer-app.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnalyzerApp />
  </React.StrictMode>,
)