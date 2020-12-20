import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { Button, FormControl } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import './user.css';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone_number: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    formValidation = () => {
        let isValid = true;
        const errors = {};

        if (this.state.name.trim().length < 1) {
            errors.userNameLength = "Name is required!"
            isValid = false;
        }
        if (this.state.phone_number.trim().length != 10) {
            errors.phoneNumberLength = "Number must be 10 digits!"
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    }

    onSubmit = e => {
        e.preventDefault();

        const isValid = this.formValidation();

        // create form as we are using the formidable package on backend
        if (isValid) {
            let formData = new FormData();

            // add data from state to form
            formData.append('name', this.state.name);
            formData.append('phone_number', this.state.phone_number);

            axios.post(`/api/v1/user`, formData)
                .then(res => {
                    console.log('Name and number added');
                })

            // reset form
            this.setState({ name: "", phone_number: "" });
        } else {
            console.log('Invalid Form');
        }
    };

    render() {
        const { errors } = this.state;
        return (
            <form noValidate className="user-form" onSubmit={this.onSubmit}>
                <div className="center-user">
                    <h5 className='login-alert login-banners'>Enter Your Name and Number<i className="fas fa-sign-in-alt"></i></h5>
                    <div className="name-div">
                        <TextField
                            noValidate
                            onChange={this.onChange}
                            value={this.state.name}
                            type="name"
                            id="name"
                            label="Name"
                            variant="outlined"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                        />
                        {errors.userNameLength &&
                            <p style={{ color: "red" }}>{errors.userNameLength}</p>
                        }
                        <p></p>
                    </div>
                    <div className="phone-number-div">
                        <TextField
                            noValidate
                            onChange={this.onChange}
                            value={this.state.phone_number}
                            type="phone_number"
                            id="phone_number"
                            label="Phone Number"
                            variant="outlined"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                        />
                        {errors.phoneNumberLength &&
                            <p style={{ color: "red" }}>{errors.phoneNumberLength}</p>
                        }
                        <p></p>
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Continue
                    </Button>
                </div>
            </form>
        );
    }
}

export default User;