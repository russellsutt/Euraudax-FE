import React, { Component } from 'react'
import RideRoute from './RideRoute'
import { withRouter } from 'react-router-dom'
import CommentContainer from '../containers/CommentContainer'

const BASE_API = "http://localhost:3000/"

class Event extends Component {

   state = {
        attendees: [],
        attended: false,
        event: this.props.event,
   }
    
    componentDidMount() {
        if (this.props.event.attendees) {
            this.setState({ attendees: this.props.event.attendees })
        }
        if (this.findAttendanceProps()) {
            this.setState({ attended: true })
        } else {
            this.setState({ attended: false })
        }
    }
    
    findAttendanceProps = () => {
        let userAttendances;
        if (this.props.user.attendees) {
            userAttendances = this.props.user.attendees.map(attendee => attendee.id)
        }
        let eventAttendances;
        if (this.props.event.attendees) {
            eventAttendances = this.props.event.attendees.map(attendee => attendee.id)
        }
        if ((userAttendances) && (eventAttendances)) {
            for (let i = 0; i < userAttendances.length; i++) {
                for (let j = 0; j < eventAttendances.length; j++) {
                    if ( userAttendances[i] === eventAttendances[j] ) {
                        return true
                    }
                }
            }
        } else {
            return false
        }
    }
    
    cancelEvent = () => {
        console.log(this.props.event.id)
        fetch(`${BASE_API}events/${this.props.event.id}`, {
            method: "DELETE",
        })
        .then(() => {this.props.history.push('/home')})
    }

    attendEvent = () => {
        fetch(BASE_API + 'attendees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json',
            },
            body: JSON.stringify({ user_id: this.props.user.id, event_id: this.props.event.id })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ attendees: [...this.state.attendees, data], attended: true });
                this.props.homeFeedHandler(data)
            }
            )
    }

    findAttendance = () => {
        if (this.state.attendees.find(attendee => attendee.user_id === this.props.user.id)) {
            return this.state.attendees.find(attendee => attendee.user_id === this.props.user.id)
        } else if (this.state.attendees.find(attendee => attendee.user.id === this.props.user.id)) {
            return this.state.attendees.find(attendee => attendee.user.id === this.props.user.id)
        } else {
            return null
        }
    }

    leaveEvent = () => {
        if (this.findAttendance()) {
            let attendance = this.findAttendance()
            fetch(`${BASE_API}attendees/${attendance.id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'accepts': 'application/json',
                }
            })
            .then(() => {
                this.props.homeFeedHandler(attendance)
                let updatedArray = this.state.attendees.filter(attendee => attendance.id !== attendee.id)
                this.setState({ attended: false, attendees: updatedArray });
            })
        }
    }

    convertTime = () => {
        let convertedTime = new Date(this.props.event.time * 1000).toISOString().substr(11, 8);
        let splitTime = convertedTime.split('')
        let splicedTime = splitTime.splice(0, 5)
        let finalMilitaryTime = splicedTime.join('')
        if (this.props.event.time >= 43200) {
            if (this.props.event.time < 46800) {
                return finalMilitaryTime + " P.M."
            } else {
                let minutes = finalMilitaryTime.slice(2)
                let stringHours = finalMilitaryTime.slice(0, 2)
                let hour = (parseInt(stringHours) - 12)
                return hour + minutes + " P.M."
            }
        } else {
            if (this.props.event.time < 36000) {
                let minutes = finalMilitaryTime.slice(2)
                let stringHours = finalMilitaryTime.slice(0, 2)
                let hour = parseInt(stringHours)
                return hour + minutes + " A.M."
            } else {
                return finalMilitaryTime + " A.M."
            }
        }
    }


    render() {
        const event = this.props.event
        return (
            <div className="event-show-container">
                <div className='event-show'>
                    <h1 style={{ textDecoration: 'underline'}}>{event.title}</h1>
                    <h4 className="sub-title">{event.route.description}</h4>
                    <h4 className="sub-title">{event.date} at {this.convertTime(event.time)}</h4>
                    <br/>
                    <div>
                        <div className="event-show-image-container">
                            <RideRoute key={event.route.id} route={event.route} event={event} />
                            {this.props.user.id === event.user.id ? null :
                                <div>
                                    {!this.state.attended ? <button className="event-show-buttons" onClick={() => { this.attendEvent() }}>RSVP!</button> : <button className="event-show-buttons" onClick={() => this.leaveEvent()}>UNRSVP!</button>}
                                </div>}
                            {this.props.event.user.id === this.props.user.id ? <button className="event-show-buttons" onClick={this.cancelEvent}>Cancel Event</button> : null}
                            <h5 className="rsvp-count">{this.state.attendees.length + 1} cyclist(s) RSVP'd </h5>
                            <h5 className="event-show-disclaimer">Hosted by {event.user.firstname} {event.user.lastname} <img height='50px' width='50px' src={event.user.pic} alt='' className="event-show-image" /></h5>
                        </div>
                    </div>
                    <CommentContainer comments={event.comments} event={event} user={this.props.user} />
                    <br/>
                </div>
            </div>
        )
    }
}

export default withRouter(Event)