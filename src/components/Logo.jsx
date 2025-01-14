import React from 'react';
import logoo from '../assets/logoo.png';

function Logo({ width = '100px' }) {
  return (
    <div>
      <img
        src={logoo}
        className="mr-3  "
        alt="Logo"
        style={{
          width: width,
          height: width, // Keep height equal to width for a circular shape
        }}
      />
    </div>
  );
}

export default Logo;
