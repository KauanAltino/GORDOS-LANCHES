// src/components/Menu.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishes } from '../actions';

const Menu = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div>
      <h1>Cardápio</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish._id}>{dish.name} - R${dish.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
