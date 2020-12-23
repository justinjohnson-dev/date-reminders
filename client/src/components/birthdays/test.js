import React, { Component } from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import './birthday.css';
import Birthday from "./birthday";


class Tester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            userName: "",
            userPhone: "",
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

    render() {
        return (
            <div className="birthday-adds">
                <div className="welcome-banner">
                    <p>Welcome, {this.state.userName.substr(0, this.state.userName.indexOf(' '))}!</p>
                    <p>Name - <span>{this.state.userName}</span></p>
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
                            <Birthday />
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