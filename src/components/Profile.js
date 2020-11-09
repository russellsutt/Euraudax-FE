import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'



class Profile extends Component {

    state = {

    }

    render() {
        const user = this.props.user
        return (
            <div className="main-feed">
                <img alt="" className='profile-image' src={user.pic} />
                <br/>
                <Card bg='secondary' text='light'>
                    <Card.Body>
                        <Card.Title>{user.firstname} {user.lastname}</Card.Title>
                        <Card.Subtitle>{user.city}, {user.state}</Card.Subtitle>
                        <br/>
                        <h2>About Me</h2>
                        <Card.Text> {user.bio}</Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <button>Follow {user.firstname}</button>
            </div>
        )
    }
}

export default withRouter(Profile)