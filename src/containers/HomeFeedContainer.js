import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Event from '../components/Event'

const BASE_API = 'http://localhost:3000/'

class HomeFeedContainer extends Component {

    state = {
        events: [],
    }

    componentDidMount() {
        fetch(BASE_API + 'events', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ events: data }))
        .then(() => {
            let updatedArray = this.state.events.filter(event => event.user.id === this.props.user.id)
            this.setState({ events: updatedArray });
        })
    }


    renderUserEvents = () => {
        if (this.state.events.length > 0 ) {
            return this.state.events.map(event => {
                return <Event key={event.id} event={event} user={this.props.user} refresh={this.props.refresh} profileEventHandler={this.props.profileEventHandler}/>
            })
        }
    }

    render() {
        return (
            <div className="main-feed">
                <div className="title-wrapper">
                    <h1 className="title">Feed</h1>
                </div>
                {this.renderUserEvents()}
            </div>
        )
    }
}

export default withRouter(HomeFeedContainer)