// src/actions/index.js
import axios from 'axios';

export const fetchDishes = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/dishes');
  dispatch({ type: 'FETCH_DISHES', payload: response.data });
};
