import React, { useContext, useState, useEffect } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  // Initialize category state
  const [currentCategory, setCategory] = useState("dishes");

  // Update the category state whenever the prop category changes
  useEffect(() => {
    setCategory(category);
  }, [category]);

  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>{`Top ${currentCategory === 'All' ? 'Dishes' : currentCategory} near you`}</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (currentCategory === "All" || currentCategory === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Return null if the category doesn't match
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
