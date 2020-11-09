import React, { Component } from 'react'


class Weather extends Component {

    state = {
        year: '',
        month: '',
        date: '',
        temperature: '',
        tempMax: '',
        tempMin: '',
        humidity: '',
        weatherDescription: ''
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    componentDidMount() {
        let [ month, date, year ] =(new Date() ).toLocaleDateString().split('/')
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=5128581&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_TOKEN}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ 
                    year: year,
                    month: month,
                    date: date,
                    temperature: data.main.temp,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    humidity: data.main.humidity,
                    weatherDescription: data.weather[0].description
                })
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <div className="weather">
                <div>
                    <h5>Today's Weather</h5>
                    <h6>NYC</h6>
                    <h6>{this.state.month} - {this.state.date} - {this.state.year}</h6>
                    <h6>{this.capitalize(this.state.weatherDescription)}</h6>
                    <h6>Temperature: {this.state.temperature}°F</h6>
                    <h6>High: {this.state.tempMax}°F</h6>
                    <h6>Low: {this.state.tempMin}°F</h6>
                    <h6>Humidity: {this.state.humidity}%</h6>
                </div>
            </div>
        )
    }
}

export default Weather;