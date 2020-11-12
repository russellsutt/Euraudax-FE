import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Map from './Map'


class RideRoute extends Component {


    convertDistance = () => {
        let miles = (this.props.route.distance / 1609.344).toFixed(2)
        return parseFloat(miles)
    }

    convertSeconds = (route) => {
        if (this.props.route.estimated_time) {
            let convertedTime = new Date(this.props.route.estimated_time * 1000).toISOString().substr(11, 8);
            let splitTime = convertedTime.split('')
            var splicedTime = splitTime.splice(0, 5)
            splicedTime[2] = 'hr'
            splicedTime.push('min')
            splicedTime.splice(3, 0, ' ')
            return splicedTime.join('')
        }
    }

    render() {
        const route = this.props.route
        return (
            <div>
                {this.props.event ? null : <h1>{route.title}</h1>}
                {route ? <h4> {this.convertDistance()} miles | Elev: {route.elevation} ft | Avg Time: {this.convertSeconds()} {this.props.event ? <>| Pace: {this.props.event.pace}</> : null} </h4> : null}
                <br/>
                <Map key={route.id} polyline={route.polyline}/>
            </div>
        )
    }
}

export default withRouter(RideRoute);