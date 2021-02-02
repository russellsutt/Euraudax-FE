import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Weather from '../components/Weather'
import SideProfile from '../components/SideProfile'
import NavBar from '../components/NavBar'
import AccountSettingsContainer from './AccountSettingsContainer'
import ExploreContainer from './ExploreContainer'
import HomeFeedContainer from './HomeFeedContainer'
import CreateContainer from './CreateContainer'
import ProfileContainer from './ProfileContainer'
import Banner from '../components/Banner'
import EventShow from '../components/EventShow'

// const BASE_API = "https://euraudax-app-api.herokuapp.com/"
const BASE_API = "http://localhost:3000/"
const STRAVA_CLIENT_ID = process.env.REACT_APP_STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.REACT_APP_STRAVA_CLIENT_SECRET

class HomePageContainer extends Component {

    state = {
        user: this.props.user,
        hosting: this.props.user.events,
        attending: this.props.user.attendees,
        eventId: this.props.eventId,
        exchangeToken: ''
    }

    componentDidMount() {
        if (document.URL.includes('exchange')) {
            this.fetchAthlete(document.URL)
        } else {
            const token = localStorage.getItem("token")
            if (token) {
                fetch(`${BASE_API}profile`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then(r => r.json())
                    .then(data => {
                        this.setState({ user: data.user, hosting: data.user.events, attending: data.user.attendees });
                    })
            }
        }
    }

    navBarHandler = (event) => {
        window.scrollTo(0, 0)
        this.props.history.push(event)
    }

    profileEventHandler = (incomingAttendeeObj) => {
        if (this.state.attending.find(attendee => attendee.id === incomingAttendeeObj.id )) {
            let updatedArray = this.state.user.attendees.filter(attendee => attendee.id !== incomingAttendeeObj.id)
            this.setState({ attending: updatedArray })
        } else {
            this.setState({ attending: [...this.state.attending, incomingAttendeeObj] })
        }
    }

    fetchAthlete = (url) => {
        let firstIndex = url.indexOf('code=')
        let firstTrim = url.slice(firstIndex + 5)
        let secondIndex = firstTrim.indexOf("&")
        let finalCode = firstTrim.slice(0, secondIndex)
        fetch(`https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${finalCode}&grant_type=authorization_code`, {
            method: "POST",
        })
        .then(resp => resp.json())
        .then(resp => {
            this.saveAthlete(resp.athlete)
            this.fetchAthleteRoutes(resp.athlete.id, resp.access_token)
        })
  }

  saveAthlete = (athlete) => { 
    const token = localStorage.getItem("token")
    fetch(BASE_API + `users/${this.props.user.id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({
            firstname: athlete.firstname,
            lastname: athlete.lastname,
            pic: athlete.profile_medium
        })
    })
    .then(resp => resp.json())
  }

  fetchAthleteRoutes = (id, access_token) => {
      fetch(`https://www.strava.com/api/v3/athletes/${id}/routes`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${access_token}` }
      })
          .then(response => response.json())
          .then(resp => this.saveAthleteRoutes(resp))
  }
    
    saveAthleteRoutes = routes => {
        console.log(routes)
        routes.forEach(route => {
            console.log(route)
            fetch(BASE_API + 'routes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title: route.name,
                    description: route.description,
                    distance: route.distance,
                    elevation: route.elevation_gain,
                    estimated_time: route.estimated_moving_time,
                    polyline: route.map.summary_polyline,
                    user: this.props.user.id
                })
            })
            .then(resp => resp.json())
            .then(() => window.location.reload())
            })
        }


    render() {
        return (
            <div className="grid-container">
                <Banner />
                <SideProfile renderEvent={this.props.renderEvent} logoutHandler={this.props.logoutHandler} user={this.state.user} host={this.state.host} attending={this.state.attending}/>
                <NavBar navBarHandler={this.navBarHandler} />
                    <Switch>
                    <Route exact path='/home' render={() => <HomeFeedContainer renderEvent={this.props.renderEvent} refresh={this.componentDidMount} user={this.state.user} profileEventHandler={this.profileEventHandler} />} />
                        <Route path='/home/create' render={() => <CreateContainer refresh={this.componentDidMount} user={this.state.user}/> }/>
                        <Route path='/home/explore' render={() => <ExploreContainer renderEvent={this.props.renderEvent} refresh={this.componentDidMount} user={this.state.user} profileEventHandler={this.profileEventHandler}/> }/>
                        <Route path='/home/profile' render={() => <ProfileContainer refresh={this.componentDidMount} user={this.state.user}/>}/>
                        <Route path='/home/accountsettings' render={() => <AccountSettingsContainer refresh={this.componentDidMount} user={this.state.user} />} />
                        <Route path='/home/event' render={() => <EventShow key={this.state.eventId} user={this.state.user} eventId={this.state.eventId} profileEventHandler={this.profileEventHandler}/>} />
                    </Switch>
                <Weather />
            </div>
        )
    }
}





export default withRouter(HomePageContainer)