import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon">
          <FontAwesomeIcon icon={faMicroscope} />
          <div className="sterile-plate"></div>
        </div>
        <h1>404 - Microbe Not Found in Culture</h1>
        <p className="not-found-joke">
          It looks like this plate is completely sterile. The organism (or page) you are looking for has failed to grow or was never inoculated.
        </p>
        <p className="not-found-sub">
          Check the URL or return to the main bench to start a new workup.
        </p>
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faHome} /> Back to Main Bench
        </button>
      </div>
    </div>
  );
}
