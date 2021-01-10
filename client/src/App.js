import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/user/user';
import Header from './components/banner/banner';
import Footer from './components/footer/footer';
import BirthdayHome from './components/birthdays/birthdayHome';
import EditBirthday from './components/birthdays/editBirthdays';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={User} />
        <Route exact path="/birthday" component={BirthdayHome} />
        <Route exact path="/editBirthdays" component={EditBirthday} />
        <Footer />
      </Router>
    );
  }
}

export default App;
