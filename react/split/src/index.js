import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';

// Import your other components here
import Component1 from './Components/Home.jsx';
import Component2 from './Components/Chat.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Home" element={<Component1 />} />
        <Route path="/Chat" element={<Component2 />} />
        {/* Add more Routes for other components as needed */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
