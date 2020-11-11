import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


const BASE_API = "http://localhost:3000/"

class EventShow extends Component {

    state = {
        eventId: this.props.eventId,
        events: [],
        event: {},
    }

    componentDidMount() {
        console.log(this.props)
        fetch(`${BASE_API}events/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ events: data })
            })
            .then(() => this.filterEvents())
    }

    componentDidUpdate(prevProps) {
        if (prevProps.eventId !== this.props.eventId) {
            this.filterEvents()
            console.log(this.state)
        }
    }

    filterEvents = () => { 
        let newEvent = this.state.events.filter(event => event.id === this.props.eventId)
        this.setState({ event: newEvent })
    }

    render() {
        return (
            <div className="main-feed">
                <h1>{this.state.event.title}</h1>
                <p>You're Here</p>
            </div>
        )
    }
}


export default withRouter(EventShow)