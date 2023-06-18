import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ChatbotBox.css';

const SelectInput = ({ value, onChange, options, label }) => (
  <select value={value} onChange={onChange}>
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

SelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

const ChatbotBox = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [equipment, setEquipment] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const data = { age, height, weight, equipment };
    const params = new URLSearchParams(data);
    const queryString = params.toString(); 
    setTimeout(() => {
      setResponse(queryString);
    }, 1000);
  }, [age, height, weight, equipment]);

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
          <SelectInput
            value={age}
            onChange={(e) => setAge(e.target.value)}
            options={ageOptions}
            label="Select age"
          />
          <SelectInput
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            options={heightOptions}
            label="Select height"
          />
          <SelectInput
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            options={weightOptions}
            label="Select weight"
          />
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
