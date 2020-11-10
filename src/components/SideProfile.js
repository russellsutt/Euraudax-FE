import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ListGroup, Container } from 'react-bootstrap'


class SideProfile extends Component {

    state = {
        user: this.props.user,
        attending: [],
    }

    renderEventShowPage = () => {

    }

    renderHostedEvents = () => {
        if (this.props.user.events && this.props.user.events.length > 0 ) {
            return <Container fluid><ListGroup> {this.props.user.events.map(event => <ListGroup.Item id={event.id} key={event.id} variant="info"id='event-list-card' action onClick={() => this.renderEventShowPage()}>{event.title}</ListGroup.Item>)} </ListGroup></Container>
        } else {
            return <h6>Currently not hosting any events.</h6>
        }
    }

    renderAttendingEvents = () => {
        if (this.props.attending.length > 0 ) {
            return  this.props.attending.map(attendee => <ListGroup.Item id={attendee.event.id} key={attendee.id} variant="info" action onClick={() => this.renderEventShowPage()}>{attendee.event.title}</ListGroup.Item>)
        } else {
            return <h6>You're currently not attending other events</h6>
        }
    }

    render() {
        return (
            <div className="side-profile">
                <div className="side-profile-container">
                    <img alt='' src={this.props.user.pic} className="profile-side-image"></img>
                    <br/>
                    <h4> {this.props.user.firstname} {this.props.user.lastname}</h4>
                    <div className="attending-events-container">
                        <h5> Your Hosted Events </h5>
                        <Container id="side-profile-events" fluid>
                            <ListGroup variant="flush">
                                {this.renderHostedEvents()}
                            </ListGroup>
                        </Container>
                        <br/>
                        <Container fluid>
                        <h5> Attending </h5>
                            {this.props.attending ? this.renderAttendingEvents() : null}
                        </Container>
                        <br />
                        <Container fluid>
                            <button className="account-settings-button" onClick={() => this.props.history.push('/home/accountsettings')}>Account Settings</button>
                            <button className="logout-button" variant="danger" onClick={() => this.props.logoutHandler()}>Logout</button>
                        </Container>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SideProfile)