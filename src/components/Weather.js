import React, { Component } from 'react'
import './scss/Weather.scss'

class Weather extends Component {

    state = {
        year: '',
        month: '',
        date: '',
        temperature: '',
        tempMax: '',
        tempMin: '',
        humidity: '',
        weatherDescription: '',
        weatherIcon: ''
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
                    weatherDescription: data.weather[0].description,
                    weatherIconId: data.weather[0].icon
                })
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <div className="weather">
                <div className="weather-card">
                    <h2 style={{textDecoration: 'underline', letterSpacing: '.15em' }}>NYC</h2>
                    <h3>{this.capitalize(this.state.weatherDescription)}
                        <br />
                    Humidity {this.state.humidity}%</h3>
                    <br/>
                    <h1>{parseInt(this.state.temperature)}°F</h1>
                    <br/>
                    <img className="weather-icon" src={`http://openweathermap.org/img/wn/${this.state.weatherIconId}@2x.png`} alt=''></img>
                </div>
            </div>
        )
    }
}

export default Weather;



