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
        let { birthdays } = this.state;

        // validate birthday
        const isValid = this.formValidation();

        if (isValid) {

            // find last id increment new by one
            // TODO: when object is remove fix the ID's to be in right order
            if (birthdays != undefined && birthdays.length > 0) {
                // what is the last index ID?
                lastBirthdayIndex = birthdays.length - 1;
                lastBirthdayId = birthdays[lastBirthdayIndex].id;
                console.log("lastBirthdayId")
                console.log(lastBirthdayId)
                let newBirthday = {
                    id: lastBirthdayId + 1,
                    birthdayName: birthdayName,
                    birthdayDate: birthdayDate
                }

                console.log(newBirthday)
                this.state.birthdays.push(newBirthday);

                // reset state
                this.setState({
                    birthdayName: "",
                    birthdayDate: ""
                })
            } else {
                let newBirthday = {
                    id: 1,
                    birthdayName: birthdayName,
                    birthdayDate: birthdayDate
                }

                // console.log(birthdays)
                // if (birthdays == undefined) {
                //     birthdays = newBirthday
                // }
                // // birthdays.push(newBirthday);

                console.log(newBirthday)
                // reset state
                this.setState({
                    birthdayName: "",
                    birthdayDate: "",
                    birthdays: newBirthday
                })

            }

        } else {
            console.log('Invalid Form');
        }
    }


    // renderTableData() {
    //     // update ID for changed birthdays edited remove etc. 
    //     const { birthdays } = this.state;
    //     let iterator = 1;

    //     // re-indexs every time table renders 
    //     // in case something was deleted
    //     // console.log(birthdays.length)
    //     if (birthdays != undefined) {
    //         // Object.keys(birthdays).map((key, i) => {
    //         //     birthdays[key].id = iterator;
    //         //     iterator++;
    //         // })
    //         console.log('birthdays.length < 2')
    //         // console.log(birthdays)

    //         for (let i = 0; i < birthdays.length; i++) {
    //             return (
    //                 <tr key={birthdays[i].id}>
    //                     <td>{birthdays[i].id}</td>
    //                     <td>{birthdays[i].birthdayName}</td>
    //                     <td>{birthdays[i].birthdayDate}</td>
    //                     <td><button onClick={() => this.removeElement(birthdays[i].id)} className="button create-button create-button"><span>Remove</span></button></td>
    //                 </tr>
    //             )
    //         }

    //         // return birthdays.map((birthday, index) => {
    //         //     const { id, birthdayName, birthdayDate } = birthday //destructuring
    //         //     return (
    //         //         <tr key={id}>
    //         //             <td>{id}</td>
    //         //             <td>{birthdayName}</td>
    //         //             <td>{birthdayDate}</td>
    //         //             <td><button onClick={() => this.removeElement(id)} className="button create-button create-button"><span>Remove</span></button></td>
    //         //         </tr>
    //         //     )
    //         // })
    //     } else {
    //         return (
    //             <p>No birthdays</p>
    //         )
    //     }
    // }


    renderTableData() {
        // update ID for changed birthdays edited remove etc. 
        const { birthdays } = this.state;
        let iterator = 1;

        // re-indexs every time table renders 
        // in case something was deleted
        // console.log(birthdays.length)
        if (birthdays != undefined) {
            console.log('birthdays')
            console.log(birthdays.length)
            if (birthdays.length > 1) {
                Object.keys(birthdays).map((key, i) => {
                    birthdays[key].id = iterator;
                    iterator++;
                })
                console.log('birthdays.length < 2')
                // console.log(birthdays)
                return birthdays.map((birthday, index) => {
                    const { id, birthdayName, birthdayDate } = birthday //destructuring
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{birthdayName}</td>
                            <td>{birthdayDate}</td>
                            <td><button onClick={() => this.removeElement(id)} className="button create-button create-button"><span>Remove</span></button></td>
                        </tr>
                    )
                })
            } else {
                console.log('else block')
                // console.log(birthdays)
                // console.log(birthdays.length)
                return birthdays.map((birthday, index) => {
                    const { id, birthdayName, birthdayDate } = birthday //destructuring
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{birthdayName}</td>
                            <td>{birthdayDate}</td>
                            <td><button onClick={() => this.removeElement(id)} className="button create-button create-button"><span>Remove</span></button></td>
                        </tr>
                    )
                })
            }
        } else {
            return (
                <p>No birthdays</p>
            )
        }
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

        if (this.state.birthdays != undefined) {
            axios.post(`/api/v1/userBirthdays`, userInfo)
                .then(res => {
                    console.log("userInfo")
                    console.log(userInfo)
                })
        } else {
            console.log('Sending no data - no birthdays were added')
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="birthday-adds">
                <div className="description">Add new Birthday!</div>
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
                    <h3 id='title'>Edit Birthdays</h3>
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
                    <Link to={{ pathname: '/birthday', state: { birthdays: this.state.birthdays } }} style={{ textDecoration: 'none' }}>
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