import React, { Component } from 'react'

class NavBar extends Component {

    state = {

    }

    clickHandler = (e) => {
        e.preventDefault()
        this.props.navBarHandler(e.target.value)
    }


    render() {
        return (
            <div className="navbar">
                <div className="button-container">
                    <button className="navbar-button" variant='warning' value="/home" onClick={(e) => this.clickHandler(e)}>Home</button>
                    <button className="navbar-button" variant='warning' value="/home/explore" onClick={(e) => this.clickHandler(e)}>Explore</button>
                    <button className="navbar-button" variant='warning' value="/home/create" onClick={(e) => this.clickHandler(e)}>Create Event</button>
                    <button className="navbar-button" variant='warning' value="/home/profile" onClick={(e) => this.clickHandler(e)}>Profile</button>
                </div>
            </div>
        )
    }
}


export default NavBar