import React, { useState, useRef, useEffect } from 'react';

const TimerInsideDiv = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();

  const ITEM_HEIGHT = 30; // Each row height (px)

  const handleScroll = (setter, max, e) => {
    const selectedIndex = Math.round(e.target.scrollTop / ITEM_HEIGHT);
    setter((selectedIndex + max) % max); // Loop if needed
  };

  const renderColumn = (value, setter, max, ref) => (
    <div
      ref={ref}
      onScroll={(e) => handleScroll(setter, max, e)}
      style={{
        height: ITEM_HEIGHT * 3,
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        width: '60px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ height: ITEM_HEIGHT }} /> {/* Top empty space */}
      {Array.from({ length: max }).map((_, idx) => (
        <div
          key={idx}
          style={{
            height: ITEM_HEIGHT,
            lineHeight: `${ITEM_HEIGHT}px`,
            fontSize: idx === value ? '24px' : '18px',
            fontWeight: idx === value ? 'bold' : 'normal',
            color: idx === value ? '#000000' : '#888888',
          }}
        >
          {idx.toString().padStart(2, '0')}
        </div>
      ))}
      <div style={{ height: ITEM_HEIGHT }} /> {/* Bottom empty space */}

      {/* Middle highlight background */}
      <div
        style={{
          position: 'absolute',
          top: ITEM_HEIGHT,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          pointerEvents: 'none',
        }}
      />
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' ,marginTop:-40 }}>
        {renderColumn(hours, setHours, 24, hourRef)}
        {renderColumn(minutes, setMinutes, 60, minuteRef)}
        {renderColumn(seconds, setSeconds, 60, secondRef)}
      </div>

      <button
        style={{
          marginTop: 20,
          padding: '8px 20px',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#33475B',
          color: '#FFFFFF',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: 40,
          width: '200px',
        }}
        onClick={() => {
          alert(`Time set: ${hours.toString().padStart(2, '0')} ${minutes.toString().padStart(2, '0')} ${seconds.toString().padStart(2, '0')}`);
        }}
      >
        Save
      </button>
    </>
  );
};

export default TimerInsideDiv;
