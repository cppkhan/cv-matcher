// CircularProgressBar.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ percentage }) => {
  return (
    <div style={{ width: '150px',height:'150px', margin: 'auto' }}>
      <CircularProgressbar
        value={percentage}
        text={percentage&&typeof percentage == 'number'?`${percentage}%`:'0%'}
        styles={buildStyles({
          textSize: '16px',
          pathColor: `rgb(0 243 248, ${percentage / 100})`,
          textColor: '#fff',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
