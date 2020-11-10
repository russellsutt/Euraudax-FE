import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventContainer from './EventContainer'

class ExploreContainer extends Component {



    render() {
        return (
            <div className="main-feed">
                <h1>Explore</h1>
                <EventContainer user={this.props.user} profileEventHandler={this.props.profileEventHandler}/>
            </div>
        )
    }
}

export default withRouter(ExploreContainer)