import React, { Component } from 'react'
import { StaticGoogleMap, Path } from 'react-static-google-map'



class Map extends Component {

    state = {
        coordinates: [],
    }

    decode = (encoded) => {
        var points = []
        var index = 0, len = encoded.length;
        var lat = 0, lng = 0;
        while (index < len) {
            var b, shift = 0, result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;
            points.push({ lat: (lat / 1E5), lng: (lng / 1E5) })
        }
    this.setState({ coordinates: points });
    }
    
    componentDidMount() {
        if (this.props.polyline !== undefined) {
            this.decode(this.props.polyline)
        }
    }


    render() {
        return (
            <div className="map-wrapper">
                    <StaticGoogleMap
                    google={this.props.google}
                    size="600x600"
                    className='map'
                    apiKey={process.env.REACT_APP_GOOGLE_API_TOKEN}>
                    <Path points={this.state.coordinates} strokeColor="#0000FF" strokeOpacity=  {0.8} strokeWeight= {2} />
                </StaticGoogleMap>
            </div>
        )
    }
}

export default Map