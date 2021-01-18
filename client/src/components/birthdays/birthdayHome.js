import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button } from '@material-ui/core';
import './birthday.css';


class BirthdayHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            userName: "",
            userPhone: "",
            birthdayName: "",
            birthdayDate: "",
            birthdays: [],
            errors: {}
        };
    }

    componentDidMount() {
        let userInformation = localStorage.getItem('user');
        let userName = userInformation.substr(0, userInformation.indexOf(',')).trim();
        let userPhone = userInformation.substr(userInformation.indexOf(','), userInformation.length).replace(',', '').trim();
        let currentComponent = this;

        if (this.props.location.state != undefined) {
            // set state if coming from props from edit screen
            if (this.props.location.state.birthdays != undefined) {
                this.setState({
                    birthdays: this.props.location.state.birthdays
                })
            }
        } else {
            // first time viewing birthday home screen fetch data from DB
            axios.get(`/api/v1/birthdays/${userPhone}`)
                .then(function (res) {
                    currentComponent.setState({
                        birthdays: res.data.birthdays,
                    })
                });
        }

        this.setState({
            userName: userName,
            userPhone: userPhone,
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    formValidation = () => {
        let isValid = true;
        const errors = {};

        if (this.state.birthdayName.trim().length < 1) {
            errors.birthdayNameLength = "Name is required!"
            isValid = false;
        }
        if (this.state.birthdayDate.trim().length < 1) {
            errors.birthdayDateLength = "Must add a date!"
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    }


    handleAddClick = () => {
        let birthdayName = this.state.birthdayName;
        let birthdayDate = this.state.birthdayDate;

        // validate birthday
        const isValid = this.formValidation();

        if (isValid) {
            let newBirthday = {
                birthdayName: birthdayName,
                birthdayDate: birthdayDate
            }

            this.state.birthdays.push(newBirthday);

            // reset state
            this.setState({
                birthdayName: "",
                birthdayDate: ""
            })
        } else {
            console.log('Invalid Form');
        }
    }

    loadData() {
        let currentComponent = this;
        axios.get(`/api/v1/birthdays/${this.state.userPhone}`)
            .then(function (res) {
                currentComponent.setState({
                    birthdays: res.data.birthdays
                })
            });

    }

    renderTableData() {
        let currentComponent = this;
        if (currentComponent.state.birthdays != undefined) {
            return currentComponent.state.birthdays.map((birthday, index) => {
                const { id, birthdayName, birthdayDate } = birthday //destructuring
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{birthdayName}</td>
                        <td>{birthdayDate}</td>
                    </tr>
                )
            })
        } else {
            return (
                <p>No current birthdays!</p>
            )
        }
    }


    renderTableHeader() {
        let header = Object.keys(this.state.birthdays[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="birthday-adds">
                <div className="welcome-banner">
                    <h2 className="welcome-message">Welcome, <span>{this.state.userName}!</span></h2>
                    <h5>Phone Number - <span>{this.state.userPhone}</span></h5>
                    <h6><Link to="/"><button className="button create-button create-button"><span>Not you?</span></button></Link></h6>
                </div>
                <div>
                    <h3 id='title'>Birthday List</h3>
                    <table id='birthdays'>
                        <tbody>
                            {this.state.birthdays != undefined && this.state.birthdays.length > 0 &&
                                <tr>{this.renderTableHeader()}</tr>
                            }
                            {this.renderTableData()}
                        </tbody>

                    </table>
                </div>
                <div className="confirm">
                    <Link to={{ pathname: "/editBirthdays" }} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            Edit Birthdays
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BirthdayHome;