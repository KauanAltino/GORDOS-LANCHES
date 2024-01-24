// src/reducers/index.js
const initialState = {
    dishes: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DISHES':
        return { ...state, dishes: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  