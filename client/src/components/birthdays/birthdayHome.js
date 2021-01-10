import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { TextField, Button } from '@material-ui/core';
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
        axios.get(`/api/v1/birthdays/${userPhone}`)
            .then(function (res) {
                currentComponent.setState({
                    birthdays: res.data.birthdays
                })
            });

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

    renderTableData() {
        return this.state.birthdays.map((birthday, index) => {
            const { id, birthdayName, birthdayDate } = birthday //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{birthdayName}</td>
                    <td>{birthdayDate}</td>
                </tr>
            )
        })
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
                    <p>Welcome, <span>{this.state.userName}!</span></p>
                    <p>Phone Number - <span>{this.state.userPhone}</span></p>
                </div>

                <div>
                    <h1 id='title'>Birthday List</h1>
                    <table id='birthdays'>
                        <tbody>
                            {/* <tr>{this.renderTableHeader()}</tr> */}
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>

                <Link to={{ pathname: "/editBirthdays" }}>
                    <Button variant="contained" color="primary">
                        Edit Birthdays
                    </Button>
                </Link>

            </div>
        );
    }
}

export default BirthdayHome;