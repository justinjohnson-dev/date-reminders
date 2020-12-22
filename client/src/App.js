import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/user/user';
import Header from './components/banner/banner';
import Footer from './components/footer/footer';
import Birthday from './components/birthdays/birthday';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={User} />
        <Route exact path="/birthday" component={Birthday} />
        <Footer />
      </Router>
    );
  }
}

export default App;
