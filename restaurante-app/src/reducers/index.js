// src/reducers/index.js
import { BrowserRouter as Router } from 'react-router-dom';

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DISHES':
        return { ...state, dishes: action.payload };
      default:
        return state;
    }
  };

  const root = document.getElementById('root');

// Use createRoot em vez de ReactDOM.render
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
);
  
  export default rootReducer;
  