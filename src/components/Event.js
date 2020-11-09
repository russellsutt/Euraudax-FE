import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RideRoute from './RideRoute'
import CommentContainer from '../containers/CommentContainer'
import { Button, Card } from 'react-bootstrap'
import './scss/Event.scss'

const BASE_API = "http://localhost:3000/"

class Event extends Component {

    state = {
        attendees: [],
        attended: false,
        event: {},
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


    render() {
        const event = this.props.event
        return (
            <div className="event-show">
                <h1>{event.title}</h1>
                <h3>{event.date} at {this.convertTime()}</h3>
                <h3>Hosted by {event.user.firstname} {event.user.lastname}</h3>
                <RideRoute key={event.route.id} route={event.route} />
                <h5> {this.state.attendees.length + 1} cyclist(s) have signed up! </h5>
                { !this.state.attended ? <button onClick={() => { this.attendEvent() }}>RSVP!</button> : <button onClick={() =>     this.leaveEvent()}>UNRSVP!</button>}
                <CommentContainer comments={event.comments} event={event} user={this.props.user}/>
                </div>
        )
    }
}

export default withRouter(Event);

<ul>
  <li class="event-card" style="background-image: url(https://images.unsplash.com/photo-1532509854226-a2d9d8e66f8e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);">
    <div class="event-container">
      <div class="content">
        { !this.state.attended ? <button className='btn' onClick={() => { this.attendEvent() }}>RSVP!</button> : <button onClick={() =>     this.leaveEvent()}>UNRSVP!</button>}
      </div>
    </div>
    <div class="informations-container">
      <h2 class="title">Now I'm a ticket but in english</h2>
      <p class="sub-title">And me, call me "sub-title" now</p>
      <p class="price"><svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z" />
</svg>From 0 to 15 €</p>
      <div class="more-information">
        <div class="info-and-date-container">
          <div class="box info">
            <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
  </svg>
            <p>Centre Pompidou at PARIS</p>
          </div>
          <div class="box date">
            <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
  </svg>
            <p>From October to December 2020</p>
          </div>
        </div>
        <p class="disclaimer">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi eveniet perferendis culpa. Expedita architecto nesciunt, rem distinctio</p>
        </div>
    </div>
  </li>
</ul>