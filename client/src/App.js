import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/user/user';


class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={User} />
      </Router>
    );
  }
}

export default App;
