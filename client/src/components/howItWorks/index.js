import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import './index.css';


class HowItWorks extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="how-to-div">
                <div className="inner-how-to-div">
                    <h3>
                        App that allows us to never forget a birthday again!!
                    </h3>
                    <p>details...</p>

                    <p>for more information or any issues you com across - feel free to reach out!</p>
                    <div className="footer"><a href="https://www.linkedin.com/in/justin-johnson-413a93169/"><i class="fab fa-linkedin"></i></a><a className="link-link" target="_blank" href="https://www.linkedin.com/in/justin-johnson-413a93169/">JJ_DEV</a></div>
                </div>
            </div>
        );
    }
}

export default HowItWorks;