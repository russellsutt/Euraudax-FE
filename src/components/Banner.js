import React, { Component } from 'react'
import banner from "./assets/evening-cycle-ride-4k-4a.jpg";

class Banner extends Component {


    render() {
        return (
            <div className="top-banner">
                <img className='banner-img' src={banner} width="100%" height="300px" alt=''/>
            </div>
        )
    }
}

export default Banner