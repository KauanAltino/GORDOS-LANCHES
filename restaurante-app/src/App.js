// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/menu" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
