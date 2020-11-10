
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import BikeImage from './assets/pngfind.com-cycling-png-6927402.png'

class Signup extends Component{
    
    state = {
        username: "",
        password: ""
    }

    componentDidMount() {
        this.props.clearLogin()
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.signupHandler(this.state)
    }

    euraudax = () => {
        window.open("https://en.wikipedia.org/wiki/Audax_(cycling)#Euraudax_(original_form_of_audax)", "-blank");
    }
    
    render(){
        return (
            <div className="login-container">
                <div className="login-form">
                    <img src={BikeImage} height='100px' width='auto' alt=''/>
                        <h1>Join the Community here!</h1>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group/>
                                <Form.Control type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                                <br/>
                                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                            <Form.Group/>
                            <Form.Group/>
                                <button variant="warning" type="submit" value="sign up">Sign up!</button>
                                <br/>
                                
                            <Form.Group/>
                        </Form>
                    <button variant="warning" onClick={() => this.props.history.push('/login')}>Back to Login </button>
                </div>
                <br/>
                <button onClick={this.euraudax}>What's a Euraudax?</button>
            </div>
        )
    }
}

export default withRouter(Signup)