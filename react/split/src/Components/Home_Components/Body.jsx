import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdLocalDining } from 'react-icons/md';
import { IoPersonCircleSharp } from 'react-icons/io5';

const Body = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      if (window.scrollY > 100 && !expanded) {
        setExpanded(true);
      } else if (window.scrollY <= 100 && expanded) {
        setExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition, expanded]);

  const icons = [<FaDumbbell size={50} />, <MdLocalDining size={50} />, <IoPersonCircleSharp size={50} />];

  const renderWhiteBoxes = () => {
    const whiteBoxes = [
      { title: 'Workout Planner', content: 'This is the content of Workout Planner.' },
      { title: 'Nutrition Planner', content: 'This is the content of Nutrition Planner.' },
      { title: 'Social Forum', content: 'This is the content of Social Forum.' },
    ];

    return whiteBoxes.map((box, index) => (
      <div
        key={box.title}
        style={{
          backgroundColor: 'white',
          height: '20vh',
          width: '80%',
          margin: index === 0 ? '0 auto 2em' : '2em auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          padding: '1em',
          borderRadius: '5px',
          transition: 'transform 1.2s ease',
          transform: expanded ? 'scale(1.2)' : 'scale(1)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icons[index]}
        <div style={{ flex: 1, marginLeft: '1em' }}>
          <h2>{box.title}</h2>
          <p>{box.content}</p>
        </div>
        <button
          style={{
            backgroundColor: '#305E48',
            color: 'white', // Set the text color to match the background
            padding: '0.5em 1em',
            border: 'none',
            marginLeft: '150px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1em',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#62ad6c';
            e.target.style.transform = 'scale(1.07)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#305E48';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Try Me!
        </button>
      </div>
    ));
  };

  return (
    <div
      style={{
        background: '#305E48',
        height: '120vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '80%',
        }}
      >
        {renderWhiteBoxes()}
      </div>
    </div>
  );
};

export default Body;
