import React from 'react';
import Navbar from './Home_Components/Navbar';
import nutritionImage from './nutritionbanner.png';
import ChatbotBox from './Nutrition_Components/ChatbotBox';
import './NutritionPlanner.css'; // CSS styles for the component
import AIPowered from './Nutrition_Components/AIPowered';

const NutritionPlanner = () => {
  return (
    <div>
      <Navbar />
      <img src={nutritionImage} alt="Nutrition Planner" className="nutrition-image" />
      <ChatbotBox/>
      <AIPowered/>

    </div>
  );
};

export default NutritionPlanner;
