import React from 'react'
import './banner.css'

const Header = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/"><p className="navbar-name">Birthday Reminder</p></a>
                {/* <a className="navbar-info" href="/howitworks">How it works!</a> */}
            </div>
        </nav>
    )
}

export default Header;