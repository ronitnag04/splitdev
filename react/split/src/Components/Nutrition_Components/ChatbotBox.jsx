import React, { useState } from 'react';
import './ChatbotBox.css';

const ChatbotBox = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [equipment, setEquipment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // create an object with the current values
    const data = {
      age,
      height,
      weight,
      equipment
    };
    const params = new URLSearchParams(data);
    const queryString = params.toString(); 
    setTimeout(() => {
      setResponse(queryString);
    }, 1000);
  };
  

  // I am assuming the ages range from 1 to 99,
  // the heights from 50 to 95, and weights from 10 to 350 for this example
  const ageOptions = Array.from({ length: 99 }, (_, i) => i + 1);
  const heightOptions = Array.from({ length: 46 }, (_, i) => i + 50);
  const weightOptions = Array.from({ length: 341 }, (_, i) => i + 10);

  return (
    <div className="responseBox">
      <p className="chatbot-title">
        <b>Chatbot</b>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="dropdowns">
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">Select age</option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
          <select value={height} onChange={(e) => setHeight(e.target.value)}>
            <option value="">Select height</option>
            {heightOptions.map((height) => {
              const feet = Math.floor(height / 12);
              const inches = height % 12;
              return (
                <option key={height} value={height}>
                  {`${feet}' ${inches}"`}
                </option>
              );
            })}
          </select>
          <select value={weight} onChange={(e) => setWeight(e.target.value)}>
            <option value="">Select weight</option>
            {weightOptions.map((weight) => (
              <option key={weight} value={weight}>
                {weight} lbs
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Equipment"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
        <button type="submit">Submit</button>
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
