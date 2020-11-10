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
                        <h3>About Me</h3>
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



<div class="rela-block container">
    <div class="rela-block profile-card">
        <div class="profile-pic" id="profile_pic"></div>
        <div class="rela-block profile-name-container">
            <div class="rela-block user-name" id="user_name">{user.firstname} {user.lastname}</div>
            <div class="rela-block user-desc" id="user_description">{user.bio}</div>
        </div>
        <div class="rela-block profile-card-stats">
            <div class="floated profile-stat works" id="num_works">28<br></div>
            <div class="floated profile-stat followers" id="num_followers">0<br></div>
            <div class="floated profile-stat following" id="num_following">0<br></div>
        </div>
    </div>
    <div class="rela-block content">
            <div class="rela-inline image"></div>
    </div>
    <div class="rela-inline button more-images" onclick="add_images(); inf_scroll = true;">More Images</div>
</div>