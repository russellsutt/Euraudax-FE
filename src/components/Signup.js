
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
    
    render(){

        return (
            <div className="login-container">
                <div className="login-form">
                    <img src={BikeImage} height='100px' width='auto' alt=''/>
                        <h2>Join the Community here!</h2>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group/>
                                <Form.Control type="text" name="username" placeholder="Name" value={this.state.username} onChange={this.changeHandler} />
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
            </div>
        )
    }
}

export default withRouter(Signup)