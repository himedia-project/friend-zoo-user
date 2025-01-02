// components/Loding.js
import React from 'react';
import '../../css/Loding.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
