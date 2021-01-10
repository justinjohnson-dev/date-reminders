import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { TextField, Button } from '@material-ui/core';
import './birthday.css';


class EditBirthday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            id: null,
            userName: "",
            userPhone: null,
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
        let id = 1;
        let lastBirthdayIndex = null;
        let lastBirthdayId = null;

        const { birthdays } = this.state;
        // Figure out a way to increment the ID for each objec that
        // gets added to our array

        // validate birthday
        const isValid = this.formValidation();

        if (isValid) {

            // find last id increment new by one
            // TODO: when object is remove fix the ID's to be in right order
            if (birthdays.length > 0) {
                // what is the last index ID?
                lastBirthdayIndex = birthdays.length - 1;
                lastBirthdayId = birthdays[lastBirthdayIndex].id;
                console.log("lastBirthdayId")
                console.log(lastBirthdayId)
            }

            let newBirthday = {
                id: lastBirthdayId + 1,
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
                    <td><button onClick={() => this.removeElement(id)}>Remove</button></td>
                </tr>
            )
        })
    }

    removeElement = (id) => {
        const { birthdays } = this.state;
        Object.keys(birthdays).map((key, i) => {
            if (birthdays[key].id === id) {
                const newList = birthdays.filter((item) => item.id != id);
                this.setState({
                    birthdays: newList
                });
            }
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.birthdays[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    uploadToMongo = () => {
        let userInfo = {
            name: this.state.userName,
            phone_number: this.state.userPhone,
            birthdays: this.state.birthdays
        };

        axios.post(`/api/v1/userBirthdays`, userInfo)
            .then(res => {
                console.log(userInfo)
            })
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="birthday-adds">
                <div className="description">Add / Edit your saved birthdays!</div>
                <div className="birthday-edit">
                    <TextField
                        style={{ padding: "5px" }}
                        name="birthdayName"
                        placeholder="Name"
                        value={this.state.birthdayName}
                        onChange={this.onChange}
                        type="birthdayName"
                        id="birthdayName"
                        variant="outlined"
                        size="small"
                        InputProps={{ disableUnderline: true }}
                    />
                    {errors.birthdayNameLength &&
                        <p style={{ color: "red" }}>{errors.birthdayNameLength}</p>
                    }
                    <TextField
                        style={{ padding: "5px" }}
                        type="date"
                        name="birthdayDate"
                        placeholder="Name"
                        value={this.state.birthdayDate}
                        onChange={this.onChange}
                        id="birthdayDate"
                        variant="outlined"
                        size="small"
                    />
                    {errors.birthdayDateLength &&
                        <p style={{ color: "red" }}>{errors.birthdayDateLength}</p>
                    }
                    <div className="btn-box">
                        <Button onClick={this.handleAddClick}>Add</Button>
                    </div>
                </div>

                <div>
                    <h3 id='title'>Edit Birthday list</h3>
                    <table id='birthdays'>
                        <tbody>
                            {this.state.birthdays.length > 0 &&
                                <tr>{this.renderTableHeader()}</tr>
                            }
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>

                <div className="confirm">
                    <Link to="/birthday">
                        <Button variant="contained" onClick={this.uploadToMongo} color="primary" >
                            Confirm
                    </Button>
                    </Link>
                </div>


            </div>
        );
    }
}

export default EditBirthday;