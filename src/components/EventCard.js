import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CommentContainer from '../containers/CommentContainer'
import './scss/Event.scss'
import Map from './Map'

const BASE_API = "http://localhost:3000/"

class EventCard extends Component {

    state = {
        attendees: [],
        attended: false,
        event: {},
        map: ''
    }

    componentDidMount() {
        if (this.props.event.attendees) {
            this.setState({ attendees: this.props.event.attendees })
        }
        let checkAttendance = this.props.event.attendees.find(attendee => attendee.user_id === this.props.user.id)
        if (checkAttendance) {
            this.setState({ attended: true })
        } else {
            this.setState({ attended: false })
        }
        this.getMapUrl()
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
                this.props.profileEventHandler(data)
            }
            )
    }

    findAttendance = () => {
        console.log(this.state.attendees)
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
                    this.props.profileEventHandler(attendance)
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
            return finalMilitaryTime + " A.M."
        }
    }

    convertDistance = (route) => {
        let miles = (route.distance / 1609.344).toFixed(2)
        return parseFloat(miles)
    }

    convertSeconds = (route) => {
        if (route.estimated_time) {
            let convertedTime = new Date(this.props.event.route.estimated_time * 1000).toISOString().substr(11, 8);
            let splitTime = convertedTime.split('')
            let splicedTime = splitTime.splice(0, 5)
            let finalTime = splicedTime.join('')
            return finalTime
        }
    }

    getMapUrl = () => {
        let newMap = document.querySelector(`.map[data-id="${this.props.event.id}"]`)
        this.setState({ map: newMap })
    }


    render() {
        const event = this.props.event
        return (
            <li className="event-card" style={{ backgroundImage: `URL(${this.state.map.src})`, backgroundSize: '500px', backgroundRepeat: 'no-repeat', backgroundPosition: 'top'}}>
                <div className="event-container">
                    <div className="content">
                        {!this.state.attended ? <button className='btn' onClick={() => { this.attendEvent() }}>RSVP!</button> : <button onClick={() => this.leaveEvent()}>UNRSVP!</button>}
                    </div>
                </div>
                <div className="informations-container">
                    <h2 className="event-title">{event.title}</h2>
                    <p className="sub-title">{event.route.description}</p>
                    <p className="price">Distance: {this.convertDistance(event.route)} | Elev: {event.route.elevation}
                        <br/>
                        Avg Time: {this.convertSeconds(event.route)} | Pace: {event.pace}
                        <br />
                        <br/>
                        {this.props.event.attendees.length + 1 } cyclist(s) RSVP'd
                    </p>
                    <div className="more-information">
                        <div className="info-and-date-container">
                            <div className="box info">
                                <svg className="icon" style={{ width: '24px', height: '24px'}} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                                </svg>
                                <p>New York, New York</p>
                            </div>
                            <div className="box date">
                                <svg className="icon" style={{ width: '24px', height: '24px'}} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                                </svg>
                                <p>{event.date} at {this.convertTime()}</p>
                            </div>
                        </div>
                        <p className="disclaimer">Hosted by {event.user.firstname} {event.user.lastname} <img height='50px' width='50px' src={event.user.pic} alt='' className="profile-side-image" /></p>
                        <Map key={event.id} polyline={this.props.event.route.polyline} hidden='hidden' id={event.id}/>
                    </div>
                </div>

            </li>

        )
    }
}

export default withRouter(EventCard);