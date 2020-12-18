import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import './user.css';


class User extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            phone_number: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        // create form as we are using the formidable package on backend
        let formData = new FormData();

        // add data from state to form
        formData.append('name', this.state.name);
        formData.append('phone_number', this.state.phone_number);

        console.log('hello??')
        console.log(this.state.name)
        console.log(this.state.phone_number)
        axios.post(`/api/v1/user`, formData)
            .then(res => {
                console.log('removed user from liked post');
            })

    };

    render() {
        const { errors } = this.state;
        return (
            <form noValidate className="user-form" onSubmit={this.onSubmit}>
                <div className="center-user">
                    <h5 className='login-alert login-banners'>Name <i className="fas fa-sign-in-alt"></i></h5>
                    <div className="name-div">
                        <TextField
                            onChange={this.onChange}
                            error={errors.name}
                            value={this.state.name}
                            type="name"
                            id="name"
                            label="Name"
                            InputProps={{ disableUnderline: true }}
                            className={classnames("", {
                                invalid: errors.name || errors.namenotfound
                            })}
                        />
                        <p className="red-text">
                            {errors.name}
                        </p>
                    </div>
                    <div className="phone-number-div">
                        <TextField
                            onChange={this.onChange}
                            error={errors.phone_number}
                            value={this.state.phone_number}
                            type="phone_number"
                            id="phone_number"
                            label="Phone Number"
                            InputProps={{ disableUnderline: true }}
                            className={classnames("", {
                                invalid: errors.phone_number || errors.phone_number
                            })}
                        />
                        <p className="red-text">
                            {errors.phone_number}
                        </p>
                    </div>
                    <Button type="submit" variant="outlined" className="button-color">
                        Continue
                </Button>
                </div>
            </form>
        );
    }
}

export default User;