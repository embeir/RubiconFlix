import React, { useState, useEffect } from 'react';
import rubiconLogo from './rubiconflix.png';
import './LoadAnim.css';

const LoadingAnimation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className={`loading-animation ${isLoading ? 'active' : ''}`}>
      <div className="logo-container">
        <img src={rubiconLogo} alt="RubiconFlix Logo" />
      </div>
    </div>
  );
};

export default LoadingAnimation;
