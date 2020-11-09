import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Profile from '../components/Profile'


class ProfileContainer extends Component {

    render() {
        return (
            <div className="main-feed">
                <h1>Profile Container</h1>
                <Profile key={this.props.user.id} user={this.props.user} />
            </div>
        )
    }
}

export default withRouter(ProfileContainer)