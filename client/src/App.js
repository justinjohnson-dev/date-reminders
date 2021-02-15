import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/user/user';
import Header from './components/banner/banner';
import Footer from './components/footer/footer';
import BirthdayHome from './components/birthdays/birthdayHome';
import Editable from './components/birthdays/editBirthdays';
import HowItWorks from './components/howItWorks';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={User} />
        <Route exact path="/birthday" component={BirthdayHome} />
        <Route exact path="/test" component={Editable} />
        <Route exact path="/howitworks" component={HowItWorks} />
        {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;
