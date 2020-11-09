import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import BikeImage from './assets/pngfind.com-cycling-png-6927402.png'

class Login extends Component {

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
        this.props.loginHandler(this.state)
    }
    
    render(){

        return (
            <div className="login-container">
                <div className="login-form">
                    <img src={BikeImage} height='100px' width='auto' alt=''/>
                    <h1>Socialize your rides</h1>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group>
                            <Form.Control type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                            <br/>
                            <Form.Control type='password' name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                        </Form.Group>
                        <Form.Group>
                            <button variant="warning" id="login-submit" type="submit" value="Login">Login</button>
                        </Form.Group>
                    </Form>
                    <button variant="warning" id="new-user" onClick={() => this.props.history.push('/signup')}>New User? Register Here</button>
                </div>
            </div>
        )
    }
}




export default withRouter(Login)