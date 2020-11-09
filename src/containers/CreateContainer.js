import React, { Component } from 'react'
import { Form, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-bootstrap-time-picker'
import RideRoute from '../components/RideRoute'

const BASE_API = "http://localhost:3000/"

class CreateContainer extends Component {

    state = {
        title: '',
        date: new Date(),
        time: 43200,
        pace: '',
        archived: false,
        routes: [],
        selectedRouteId: 1,
        route: null,
    }

    componentDidMount() {
        fetch(BASE_API + 'routes')
            .then(response => response.json())
            .then(data => this.setState({ routes: data }))
            .then(() => this.sortRoutes())
    }

    sortRoutes = () => {
        let filteredRoutes = this.state.routes.filter(route => route)
        this.setState({ routes: filteredRoutes })
    }

    renderRouteOptions = () => {
        return this.state.routes.map(route => {
            return <option key={route.id} value={route.id}>{route.title}</option>
        })
    }

    setRoute = (routeId) => {
        let convertedId = parseInt(routeId)
        let routeObj= this.state.routes.find(route => (route.id === convertedId))
        this.setState({ route: routeObj })
    }

    renderSingleRoute = () => {
        if (this.state.route) {
            return <RideRoute key={this.state.route.id} route={this.state.route} />
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    dateHandler = (e) => {
        this.setState({ date: e })
    }

    timeHandler = (e) => {
        this.setState({ time: e })
    }

    createNewEvent = (e) => {
        e.preventDefault()
        let stringDate = String(this.state.date)
        let splitDate = stringDate.split(' ')
        let shortenedDate = splitDate.slice(1, 4).join(' ')

        fetch(BASE_API + 'events', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                date: shortenedDate,
                time: this.state.time,
                pace: this.state.pace,
                archived: this.state.archived,
                user_id: this.props.user.id,
                route_id: this.state.route.id,
            })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .then(() => {
                this.setState({
                    title: '',
                    date: new Date(),
                    time: 43200,
                    pace: '',
                    archived: false,
                    routes: [],
                    selectedRouteId: 1,
                    route: {},
                });
                setTimeout(this.props.history.push('/home'), 750)
            })
    }

    render() {
        return (
            <div className="main-feed">
                <Container fluid>
                    <h3 className="header"><u>Host an Event!</u></h3>
                    <br/>
                    <Form type="submit" onSubmit={this.createNewEvent}>
                        <Form.Group>
                            <h3>Event Title</h3>
                                <Form.Control type="text" name="title" value={this.state.title} onChange={this.changeHandler} placeholder="Name your event here!"/>
                        </Form.Group>
                        <Form.Group>
                            <h3>Date</h3>
                            <DatePicker selected={this.state.date} name="date" value={this.state.date} onSelect={this.dateHandler} closeOnScroll={true} dateFormat="MM/dd/yyyy"/>
                        </Form.Group>
                        <Form.Group>
                            <h3>Set a Time</h3>
                            <TimePicker step={30} name="time" value={this.state.time} onChange={this.timeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <h3>Pace</h3>
                            <Form.Control as="select" name="pace" value={this.state.pace} onChange={this.changeHandler}>
                                <option value="slow"> 10-14 MPH </option>
                                <option value="medium"> 15-19 MPH </option>
                                <option value="fast"> 20-24 MPH </option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <h3>Routes</h3>
                            <Form.Control as="select" name="selectedRouteId" value={this.state.selectedRouteId} onChange={(e) => { this.setRoute(e.target.value); this.changeHandler(e); this.renderSingleRoute() }}>
                                <option value="">Select a Route</option>
                                {this.renderRouteOptions()}
                            </Form.Control>
                            {this.renderSingleRoute()}
                        </Form.Group>
                        <button variant="success" className="submit-game" type="submit">Create Event!</button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default withRouter(CreateContainer)