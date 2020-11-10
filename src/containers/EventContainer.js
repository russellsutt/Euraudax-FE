import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EventCard from '../components/EventCard'
import '../components/scss/Event.scss'

const BASE_API = "http://localhost:3000/"

class EventContainer extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        fetch(BASE_API + "events")
            .then(resp => resp.json())
            .then( data => this.setState({ events: data }))
    }

    renderEvents = () => {
        return this.state.events.map(event => <EventCard event={event} key={event.id} user={this.props.user} homeFeedHandler={this.props.profileEventHandler} />)
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.events.length > 0 ? this.renderEvents() : null}
                </ul>
            </div>
        )
    }
}

export default withRouter(EventContainer)