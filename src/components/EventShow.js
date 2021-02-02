import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Event from './Event'


// const BASE_API = "https://euraudax-app-api.herokuapp.com/"
const BASE_API = "http://localhost:3000/"

class EventShow extends Component {

    state = {
        eventId: this.props.eventId,
        events: [],
        currentEvent: {},
    }

    componentDidMount() {
        fetch(BASE_API + "events")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ events: data })
        })
    }

    filterEvents = () => {
        let newEvent = this.state.events.find(event => event.id === this.props.eventId);
        if (newEvent) {
            return <Event event={newEvent} key={newEvent.id} user={this.props.user} homeFeedHandler={this.props.profileEventHandler}/>
        }
    }

    render() {
        return (
            <div className="main-feed">
                {this.state.events.length > 0 ? this.filterEvents() : null}
            </div>
        )
    }
}


export default withRouter(EventShow)