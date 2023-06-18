import React from 'react';
import Navbar from './Home_Components/Navbar';
import ChatbotBox from './Nutrition_Components/ChatbotBox';
import './NutritionPlanner.css'; // CSS styles for the component
import AIPowered from './Nutrition_Components/AIPowered';

const NutritionPlanner = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '160px 0' }}>
        <ChatbotBox/>
      </div>
      <AIPowered/>
    </div>
  );
};

export default NutritionPlanner;
