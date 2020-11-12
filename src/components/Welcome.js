import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'
import bgVideo from './assets/strava_hd.mp4'


class Welcome extends Component {


    render() {
        return (
            <div className="welcome-container">
                <div className="bg-video-container">
                    <ReactPlayer id="welcome-video" width="100%" height="100" loop={true} playing={true} volume={0}  muted={true} url={bgVideo} type="video/mp4" />
                </div>
                <div className="welcome-card">
                    <Jumbotron id="welcome-message">
                        <h1>Welcome to Euraudax</h1>
                        <p>
                            Socialize your rides
                        </p>
                        <button variant='warning' onClick={() => this.props.history.push('/login')}>Login</button>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome)