import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Container } from 'react-bootstrap'

const BASE_API = "http://localhost:3000/"

class AccountSettingsContainer extends Component {

    state = {
        firstname: '',
        lastname: '',
        bio: '',
        city: 'New York City',
        state: 'New York',
        pic: '',
    }

    componentDidMount() {
        this.setState({
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            bio: this.props.user.bio,
            pic: this.props.user.pic,
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        const token = localStorage.getItem("token")
        fetch(BASE_API + `users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                bio: this.state.bio,
                pic: this.state.pic
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    backToProfile = () => {
        this.props.history.push('/home')
    }

    render() {
        return (
            <div className="main-feed">
                <Container fluid>
                    <h1>Update Account</h1>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" name='firstname' value={this.state.firstname} onChange={this.changeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" name='lastname' value={this.state.lastname} onChange={this.changeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>About You</Form.Label>
                            <Form.Control type="textarea" placeholder="Tell us about your self..." name='bio' value={this.state.bio} onChange={this.changeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" disabled={true} value={this.state.city} onChange={this.changeHandler}/>
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" disabled={true} value={this.state.state} onChange={this.changeHandler} />
                            <Form.Text className="text-muted"> Currently only servicing New York City, NY.</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="text" name='pic' value={this.state.pic} onChange={this.changeHandler}/>
                        </Form.Group>
                        <button type="submit">Save Settings</button>
                        <br/>
                        <button onClick={this.backToProfile}>Cancel</button>
                        <br/>
                        <button variant='warning'>Import Strava Account</button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default withRouter(AccountSettingsContainer)