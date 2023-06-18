import React from 'react';
import Navbar from './Home_Components/Navbar';
import nutritionImage from './nutritionbanner.png';
import './NutritionPlanner.css'; // CSS styles for the component

const NutritionPlanner = () => {
  return (
    <div>
      <Navbar />
      <img src={nutritionImage} alt="Nutrition Planner" className="nutrition-image" />
    </div>
  );
};

export default NutritionPlanner;
