import React, { Component } from "react";
import Modal from "react-modal";
import { TextField, Button } from '@material-ui/core';
import './birthday.css';


class Tester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            userName: "",
            userPhone: "",
            birthdayName: "",
            birthdayDate: "",
            birthdays: [{ birthdayName: "", birthdayDate: "" }],
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

    handleAddClick = () => {
        console.log(this.state.birthdayName)
        console.log(this.state.birthdayDate)

        // this.setState(state => {
        //     const birthdays = [...state.birthdays, state.birthdayName, ', ', state.birthdayDate];

        //     return {
        //         birthdays,
        //         value: '',
        //     };
        // });

        this.setState({
            birthdays: [{ birthdayName: this.state.birthdayName, birthdayDate: this.state.birthdayDate }]
        })

        console.log(this.state.birthdays)
    }

    // handle click event of the Remove button
    // const handleRemoveClick = index => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    // };


    render() {
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
                            <TextField
                                type="date"
                                name="birthdayDate"
                                placeholder="Name"
                                value={this.state.birthdayDate}
                                onChange={this.onChange}
                                id="birthdayDate"
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <div className="btn-box">
                            <Button onClick={this.handleAddClick}>Add</Button>

                            {/* {inputList.length !== 1 &&
                                <Button className="mr10" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                            {inputList.length - 1 === i &&
                                <Button onClick={handleAddClick}>Add</Button>} */}
                        </div>
                        <Button type="submit" variant="contained" onClick={this.toggleModal} color="primary">
                            Close Modal
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Tester;