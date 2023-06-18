import React, { useState, useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiMailSendLine } from 'react-icons/ri';
import { FiPenTool } from 'react-icons/fi';

const Body = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hoveredBox, setHoveredBox] = useState(null); // added this line to keep track of hovered box

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
  }, [scrollPosition]);

  const icons = [<AiOutlineMail size={50} />, <RiMailSendLine size={50} />, <FiPenTool size={50} />];

  const renderWhiteBoxes = () => {
    const whiteBoxes = [
      { title: 'Email Analysis', content: '' },
      { title: 'Send Emails', content: '' },
      { title: 'Style and Tone Analysis', content: '' },
    ];

    return whiteBoxes.map((box, index) => (
      <div
        key={box.title}
        onMouseEnter={() => setHoveredBox(index)} // added this line
        onMouseLeave={() => setHoveredBox(null)} // added this line
        style={{
          backgroundColor: 'white',
          height: '20vh',
          width: '80%',
          margin: index === 0 ? '0 auto 2em' : '2em auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          padding: '1.5em', // Increased padding to 1.5em
          borderRadius: '5px',
          transition: 'transform 1.2s ease',
          transform: expanded || hoveredBox === index ? 'scale(1.2)' : 'scale(1)', // changed this line
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '0.5em' }}>{icons[index]}</div>
        <div>
          <h2>{box.title}</h2>
          <p>{box.content}</p>
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        background: '#305E48',
        height: '140vh',
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
