import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import bannerVideo from './assets/cycling-banner-v001.mp4'

class Banner extends Component {


    render() {
        return (
            <div className="top-banner">
                <div className="banner-video-container">
                    <div className="banner-video-adjustments">
                        <ReactPlayer id='banner-video' loop="true" playing={true} volume="0" muted={true} url={bannerVideo} type="video/mp4" width='100%' height='100%' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner