import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventCard from '../components/EventCard'
import '../components/scss/Event.scss'

const BASE_API = 'https://euraudax-app-api.herokuapp.com/'

class HomeFeedContainer extends Component {

    state = {
        events: [],
        attending: [],
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
        fetch(BASE_API + 'attendees', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ attending: data }))
        .then(() => {
            let updatedArray = this.state.attending.filter(attendee => attendee.user.id === this.props.user.id)
            this.setState({ attending: updatedArray });
        })
    }

    homeFeedHandler = (incomingAttendeeObj) => {
        this.props.profileEventHandler(incomingAttendeeObj)
        if (this.state.attending.find(attendee => attendee.id === incomingAttendeeObj.id )) {
            let updatedArray = this.state.attending.filter(attendee => attendee.id !== incomingAttendeeObj.id)
            this.setState({ attending: updatedArray })
        } else {
            this.setState({ attending: [...this.state.attending, incomingAttendeeObj] })
        }
    }


    renderUserEvents = () => {
        if (this.state.events.length > 0 ) {
            return this.state.events.map(event => {
                return <EventCard key={`${event.id}`} event={event} user={this.props.user} refresh={this.props.refresh} homeFeedHandler={this.homeFeedHandler} renderEvent={this.props.renderEvent}/>
            })
        } else {
            return <div><h5> You're currently not hosting any events.</h5> <br /> <button onClick={() => { this.props.history.push('home/create') }}>Create Event</button></div>
        }
    }

    renderAttendingEvents = () => {
        if (this.state.attending.length > 0 ) {
            return this.state.attending.map(attendee => {
                return <EventCard key={`${attendee.event.id}`} event={attendee.event} user={this.props.user} profileEventHandler={this.props.profileEventHandler} homeFeedHandler={this.homeFeedHandler} renderEvent={this.props.renderEvent}/>
            })
        } else {
            return <div><h5> You're currently not attending any events.</h5> <br /> <button onClick={() => { this.props.history.push('home/explore') }}>Explore Events</button></div>
        }
    }

    render() {
        return (
            <div className="main-feed">
                <div className="main-feed-card-container">
                    <br/>
                    <h1 style={{textDecoration: 'underline', letterSpacing: '.15em', textTransform: 'uppercase' }}>Hosting</h1>
                    <ul>
                        {this.renderUserEvents()}
                    </ul>
                    <h1 style={{textDecoration: 'underline', letterSpacing: '.15em', textTransform: 'uppercase'  }}>Attending</h1>
                    <ul>
                    {this.renderAttendingEvents()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeFeedContainer)