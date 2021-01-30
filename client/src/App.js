import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/user/user';
import Header from './components/banner/banner';
import Footer from './components/footer/footer';
import BirthdayHome from './components/birthdays/birthdayHome';
import EditBirthday from './components/birthdays/editBirthdays';
import HowItWorks from './components/howItWorks';
import DataTable from './components/tester/tester';
// import Tester from './components/tester/tester';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={User} />
        <Route exact path="/birthday" component={BirthdayHome} />
        <Route exact path="/editBirthdays" component={EditBirthday} />
        <Route exact path="/howitworks" component={HowItWorks} />
        <Route exact path="/Tester" component={DataTable} />
        {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;
