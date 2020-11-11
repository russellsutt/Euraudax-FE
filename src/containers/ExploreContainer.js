import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventCard from '../components/EventCard'

const BASE_API = "http://localhost:3000/"

class ExploreContainer extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        fetch(BASE_API + "events")
            .then(resp => resp.json())
            .then( data => this.setState({ events: data }))
    }

    renderEvents = () => {
        return this.state.events.map(event => <EventCard event={event} key={event.id} user={this.props.user} homeFeedHandler={this.props.profileEventHandler} renderEvent={this.props.renderEvent}/>)
    }

    render() {
        return (
            <div className="main-feed">
                <ul>
                    {this.state.events.length > 0 ? this.renderEvents() : null}
                </ul>
            </div>
        )
    }
}

export default withRouter(ExploreContainer)