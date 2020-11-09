import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Map from './Map'


class RideRoute extends Component {


    convertDistance = () => {
        let miles = (this.props.route.distance / 1609.344).toFixed(2)
        return parseFloat(miles)
    }

    convertSeconds = () => {
        if (this.props.route.estimated_time) {
            let convertedTime = new Date(this.props.route.estimated_time * 1000).toISOString().substr(11, 8);
            let splitTime = convertedTime.split('')
            let splicedTime = splitTime.splice(0, 5)
            let finalTime = splicedTime.join('')
            return finalTime
        }
    }

    render() {
        const route = this.props.route
        return (
            <div>
                <h2>{route.title}</h2>
                <p>{route.description}</p>
                {route ? <p> {this.convertDistance()} miles | Elev: {route.elevation} ft | Avg Time: {this.convertSeconds()} </p> : null }
                <Map key={route.id} polyline={route.polyline}/>
            </div>
        )
    }
}

export default withRouter(RideRoute);