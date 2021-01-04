import React, { Component } from "react";
import Modal from "react-modal";
import { TextField, Button } from '@material-ui/core';
import './birthday.css';
import Sidebar from "../sidebar/sidebar";


class Tester extends Component {
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

        this.setState({
            userName: userName,
            userPhone: userPhone
        })
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
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

    render() {
        const { errors } = this.state;

        return (
            <div className="birthday-adds">
                <div className="welcome-banner">
                    <p>Welcome, <span>{this.state.userName}!</span></p>
                    <p>Phone Number - <span>{this.state.userPhone}</span></p>
                </div>

                <Button type="submit" variant="contained" onClick={this.toggleModal} color="primary">
                    Edit Birthdays
                </Button>

                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.toggleModal}
                    contentLabel="My dialog"
                    overlayClassName="Overlay"
                >
                    <div className="modal-style">
                        <div>Add / Edit your saved birthdays!</div>
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
                        <div className="close-modal">
                            <Button type="submit" variant="contained" onClick={this.toggleModal} color="primary">
                                Close Modal
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Sidebar birthdays={this.state.birthdays} />
            </div>
        );
    }
}

export default Tester;