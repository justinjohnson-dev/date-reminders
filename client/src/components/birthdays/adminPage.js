import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone_number: "",
            birthdays: "",
            message: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        let userInfo = {
            name: this.state.name,
            phone_number: this.state.phone_number,
            birthdays: this.state.birthdays,
            message: this.state.message
        };

        axios.post(`/api/v1/admin`, userInfo)
            .then(res => {
                console.log("userInfo")
                console.log(userInfo)
            })
    };

    render() {
        // const { errors } = this.state;
        return (
            <form noValidate className="user-form" onSubmit={this.onSubmit}>
                <div className="center-user">
                    <h5 className='login-alert login-banners'>Enter Personalized message to your friend!</h5>
                    <p></p>
                    <div className="name-div">
                        <TextField
                            style={{ width: "100%" }}
                            noValidate
                            onChange={this.onChange}
                            value={this.state.name}
                            type="name"
                            id="name"
                            label="Name" s
                            variant="outlined"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                        />
                        {/* {errors.userNameLength &&
                            <p style={{ color: "red" }}>{errors.userNameLength}</p>
                        } */}
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
                        {/* {errors.phoneNumberLength &&
                            <p style={{ color: "red" }}>{errors.phoneNumberLength}</p>
                        } */}
                        <p></p>
                    </div>
                    <div className="phone-number-div">
                        <TextField
                            style={{ width: "100%" }}
                            noValidate
                            onChange={this.onChange}
                            value={this.state.birthdays}
                            type="birthdays"
                            id="birthdays"
                            label="Birthday"
                            variant="outlined"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                        />
                        {/* {errors.phoneNumberLength &&
                            <p style={{ color: "red" }}>{errors.phoneNumberLength}</p>
                        } */}
                        <p></p>
                    </div>
                    <div className="phone-number-div">
                        <TextField
                            style={{ width: "100%" }}
                            noValidate
                            onChange={this.onChange}
                            value={this.state.message}
                            type="message"
                            id="message"
                            label="Message"
                            variant="outlined"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                        />
                        {/* {errors.phoneNumberLength &&
                            <p style={{ color: "red" }}>{errors.phoneNumberLength}</p>
                        } */}
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

export default Admin;