import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ChatbotBox.css';

const ChatbotBox = () => {
  const [emailContent, setEmailContent] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const data = { emailContent };

    fetch('http://localhost:5000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors',
    })
    .then(() => {
        console.log('Request sent:', data);
        setResponse('Email sent!'); // Not actual server response, because we cannot read it in 'no-cors' mode
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    console.log('Sending request:', data); // Log the sent request

  }, [emailContent]);

  return (
    <div className="responseBox">
      <p className="chatbot-title">
        <b>Chatbot</b>
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter email content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        <button type="submit">Send Email</button>
      </form>
      {response && (
        <div className="response">
          <b>Assistant: </b>
          {response}
        </div>
      )}
    </div>
  );
};

export default ChatbotBox;
