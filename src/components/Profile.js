import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './scss/Profile.scss'



class Profile extends Component {

    state = {

    }

    render() {
        const user = this.props.user
        return (
            <div className="main-feed">
                <div className="rela-block-container">
                    <div className="profile-card">
                        <div className="profile-pic" id="profile_pic" style={{ background: `url(${this.props.user.pic})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '178px' }}></div>
                        <div className="profile-name-container">
                            <div className="user-name" id="user_name">{user.firstname} {user.lastname}</div>
                            <div className="user-desc" id="user_description">{user.bio}<br />{user.city}, {user.state}</div>
                        </div>
                        <div className="profile-card-stats">
                            <div className="profile-stat works" id="num_works"><span style={{ fontWeight: 'bold', fontSize: '25px'}}>{ user.events ? user.events.length : 0 }</span> hosted events</div>
                            <div className="profile-stat followers" id="num_followers"><span style={{ fontWeight: 'bold', fontSize: '25px'}}>{user.followers ? user.followers.length : 0}</span>  followers </div>
                            <div className="profile-stat following" id="num_following"><span style={{ fontWeight: 'bold', fontSize: '25px'}}>{user.following ? user.following.length : 0}</span>  following</div>
                        </div>
                    </div>
                </div>
            <br/>
            <button>Follow {user.firstname}</button>
            </div>
        )
    }
}

export default withRouter(Profile)



