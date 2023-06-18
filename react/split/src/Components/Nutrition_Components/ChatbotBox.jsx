import React, { useState, useCallback, useEffect, useRef } from 'react';
import './ChatbotBox.css';
import { FiSend } from 'react-icons/fi';


const ChatbotBox = () => {
  const [emailContent, setEmailContent] = useState('');
  const [response, setResponse] = useState(`Test`);
  const [finalResponse, setFinalResponse] = useState('');  // New State
  
  const textAreaRef = useRef(null);

  useEffect(() => {
    if(textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [response]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const url = new URL('http://localhost:5000/emailgenerate');
    url.searchParams.append('prompt', emailContent);

    fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response:', data);
      setResponse(data.response); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    console.log('Sending request:', url); // Log the sent request
  }, [emailContent]);

  const handlePostRequest = useCallback((e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/emailsend';

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ response }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    console.log('Sending request:', url); 
  }, [response]);

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
        <button type="submit">
          <FiSend />
        </button>
      </form>
      
      {response && (
        <div>
          <p className="chatbot-title"><b>Assistant</b></p>
          <div className="response" style={{ textAlign: 'center', marginBottom: '20px', marginLeft: '-20px' }}>
          <form onSubmit={handlePostRequest}>
            <textarea
              placeholder="Enter email content"
              value={response}
              style={{ resize: 'none', width: '90%', height: 'auto' }}
              onChange={(e) => setFinalResponse(e.target.value)} 
              ref={textAreaRef}
            />
            <button type="submit">
              <FiSend />
            </button>
          </form>
          
          
        </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotBox;
