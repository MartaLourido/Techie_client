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
import UserProfile from './components/UserProfile'
import Events from './components/Events'
import EditProfile from './components/EditProfile';
import EventCard from './components/EventCard'
import CreateEvent from './components/CreateEvent';
import AttendEvent from './components/AttendEvent'
var moment = require('moment');

class App extends React.Component {

  state = {
    loggedInUser: null,

  }

  componentDidMount() {
    // axios.get(`${API_URL}/`)
    //   .then((res) => {
    //     this.setState({
    //       : res.data
    //     })
    //   })
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
          this.props.history.push('/user')  //redirect to the userprofile when you do a login
        })
      })
      .catch((err) => {
        console.log ('An error ocurred: ' + err);
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
      .catch((err) => {
        console.log ('An error ocurred: ' + err);
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


  render() {
    return (

      <div className="App">


        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img src="logo.png" height="100" className="d-inline-block align-top" alt="" loading="lazy" />
              
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
          <Route exact path="/user" render={(routeProps) => {
            return <UserProfile {...routeProps} />
          }} />
           <Route exact path="/user/edit" render={(routeProps) => {
            return <EditProfile loggedInUser={this.state.loggedInUser} {...routeProps} />
          }} />
           <Route exact path="/events" render={(routeProps) => {
            return <Events {...routeProps} />
          }} />
           <Route exact path="/CreateEvent" render={(routeProps) => {
            return <CreateEvent {...routeProps} />
          }} />
           <Route exact path="/event/:id" render={(routeProps) => {
            return <EventCard {...routeProps} />
          }} />
           <Route exact path="/AttendEvent" render={(routeProps) => {
            return <AttendEvent {...routeProps} />
          }} />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)
