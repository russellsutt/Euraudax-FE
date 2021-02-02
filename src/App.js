import './App.scss';
import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import HomePageContainer from './containers/HomePageContainer'
import Welcome from './components/Welcome'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const BASE_API = 'http://localhost:3000'


class App extends Component {

  state = {
    newUser: {},
    eventId: '',
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`${BASE_API}/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => r.json())
        .then(data => {
          this.setState({ newUser: data.user });
      })
      .then(this.props.history.push('/home'))
      .catch(error => console.log(error))
    } else {
      this.props.history.push('/')
    }
  }

  signupHandler = (userObj) => {
    fetch(`${BASE_API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user: userObj })
    })
    .then(r => r.json())
    .then(data => {
      this.setState({ newUser: data.user })
      localStorage.setItem("token", data.jwt)
      this.props.history.push('/home')
    })
  }

  loginHandler = (userInfo) => {
    fetch(`${BASE_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user: userInfo})
    })
    .then(r => r.json())
    .then(data => {
      if (data.user) {
        this.setState({ newUser: data.user })
        localStorage.setItem("token", data.jwt)
        this.props.history.push('/home')
      } else {
        window.alert('Incorrect login info or you have not signed up yet!')
      }
    })

  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.setState({ user: {} })
    this.props.history.push('/')
  }

  clearLogin = () => {
    localStorage.removeItem('token')
    this.setState({ user: {} })
  }

  renderEventShow = (incomingEventId) => {
    this.setState({ eventId: incomingEventId }, () => { this.props.history.push('/home/event')})
  }
  

  render() {
    return (
      <div className='app'>
        <Route render={({ location }) => (
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} timeout={450} classNames='fade'>
              <Switch location={location}>
                <Route exact path='/' render={() => <Welcome />} />
                <Route path='/login' render={() => <Login loginHandler={this.loginHandler} clearLogin={this.clearLogin} />} />
                <Route path='/signup' render={() => <Signup signupHandler={this.signupHandler} clearLogin={this.clearLogin} />} />
                <Route path='/home' render={() => <HomePageContainer logoutHandler={this.logoutHandler} user={this.state.newUser} eventId={this.state.eventId} renderEvent={this.renderEventShow}/>} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div>
    );
  }
}

export default withRouter(App);
