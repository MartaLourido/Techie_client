import React from 'react';
// import logo from './img/logo.png
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { Route, withRouter, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import MyNav from './components/MyNav'
import axios from 'axios'
import { API_URL } from './config'
import Home from './components/Home'
import Feed from './components/Feed'

class App extends React.Component {

  state = {
    loggedInUser: null,

  }

  componentDidMount() {
    axios.get(`${API_URL}/todos`)
      .then((res) => {
        this.setState({
          todos: res.data
        })
      })
    if (!this.state.loggedInUser) {
      axios.get(`${API_URL}/user`, { withCredentials: true })
        .then((res) => {
          this.setState({
            loggedInUser: res.data
          })
        })
    }
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;

    axios.post(`${API_URL}/signin`, {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((res) => {
        console.log(res)
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
      })
  }

  handleLogOut = (e) => {
    axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState({
          loggedInUser: null
        }, () => {
          this.props.history.push('/')
        })
      })
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = e.currentTarget;

    axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((res) => {
        console.log(res)
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
      })
  }




  render() {
    return (

      <div className="App">


        <nav class="navbar navbar-light ">
          <a class="navbar-brand" href="/">
            <img src="logo.png" height="100" class="d-inline-block align-top" alt="" loading="lazy"/>
              Hello. Welcome to Techie
          </a>
        </nav>

          <MyNav loggedInUser={this.state.loggedInUser} onLogout={this.handleLogOut} >

          </MyNav>
          <Switch >
            <Route exact path="/" render={(routeProps) => {
              return <Home {...routeProps} />
            }} />
            <Route exact path="/SignIn" render={(routeProps) => {
              return <SignIn onSignIn={this.handleSignIn} {...routeProps} />
            }} />
            <Route exact path="/SignUp" render={(routeProps) => {
              return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
            }} />
            <Route exact path="/Feed" render={(routeProps) => {
              return <Feed {...routeProps} />
            }} />
          </Switch>
      </div>
    );
  }

}

export default withRouter(App)
