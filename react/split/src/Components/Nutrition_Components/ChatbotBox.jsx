import React, { useState, useCallback } from 'react';
import './ChatbotBox.css';
import { FiSend } from 'react-icons/fi';

const ChatbotBox = () => {
  const [emailContent, setEmailContent] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const url = new URL('http://localhost:5000/test');
      url.searchParams.append('emailContent', emailContent);

      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      console.log('Response:', data);
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
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
        <div className="response">
          <b>Assistant: </b>
          {response}
        </div>
      )}
    </div>
  );
};

export default ChatbotBox;
