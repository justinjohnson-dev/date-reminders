import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
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

    clearStorage = () => {
        localStorage.setItem("user", "");
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

    refreshPage = () => {
        window.location.reload(false);
    }

    onSubmit = e => {
        // clear local storage first
        localStorage.setItem("user", "");

        e.preventDefault();

        const isValid = this.formValidation();

        // create form as we are using the formidable package on backend
        if (isValid) {
            let formData = new FormData();

            // add data from state to form
            formData.append('name', this.state.name);
            formData.append('phone_number', this.state.phone_number);

            // axios.post(`/api/v1/user`, formData)
            //     .then(res => {
            //         let userInfo = [this.state.name, this.state.phone_number];
            //         console.log(userInfo)
            //         localStorage.setItem("user", userInfo);
            //         console.log('Name and number added');
            //     })

            // send user data to storage
            let userInfo = [this.state.name, this.state.phone_number];
            localStorage.setItem("user", userInfo);

            // reset form
            this.setState({ name: "", phone_number: "" });
            this.props.history.push({
                pathname: '/birthday',
                data: [this.state.name, this.state.phone_number]
            })

        } else {
            console.log('Invalid Form');
        }
    };

    render() {
        const { errors } = this.state;
        console.log(this.state)
        return (
            <form noValidate className="user-form" onSubmit={this.onSubmit}>
                <div className="center-user">
                    <h5 className='login-alert login-banners'>Enter Name & Number <i class="fas fa-mobile-alt"></i></h5>
                    <p></p>
                    <div className="name-div">
                        <TextField
                            style={{ width: "100%" }}
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
                            style={{ width: "100%" }}
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