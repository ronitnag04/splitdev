import React, { useState, useCallback, useEffect } from 'react';
import './ChatbotBox.css';
import { FiSend } from 'react-icons/fi';

const ChatbotBox = () => {
  const [emailContent, setEmailContent] = useState('');
  const [response, setResponse] = useState(``);
  
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  useEffect(() => {
    setTextAreaHeight(`${response.split("\n").length}`);
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
        <button type="submit">
          <FiSend />
        </button>
      </form>
      
      {response && (
        <div>
          <p className="chatbot-title"><b>Assistant</b></p>
          <div className="response" style={{ textAlign: 'center', marginBottom: '20px', marginLeft: '-20px' }}>
          <textarea
            placeholder="Enter email content"
            value={response}
            style={{ resize: 'none', width: '90%', height: 'auto' }}
            readOnly
            rows={textAreaHeight}
          />
        </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotBox;
