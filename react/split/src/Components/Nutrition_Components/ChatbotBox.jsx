import React, { useState, useCallback } from 'react';
import './ChatbotBox.css';

const ChatbotBox = () => {
  const [emailContent, setEmailContent] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const url = new URL('http://localhost:5000/test');
    url.searchParams.append('emailContent', emailContent);

    fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Response:', data);
        setResponse(data); 
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    console.log('Sending request:', url); // Log the sent request

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
