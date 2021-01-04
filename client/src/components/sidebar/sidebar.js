import React, { Component } from "react";
import './sidebar.css';


class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar">
                hello
                {
                    JSON.stringify(this.props.birthdays)
                }
            </div>
        );
    }
}

export default Sidebar;