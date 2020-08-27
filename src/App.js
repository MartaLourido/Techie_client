import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { Route, Link, Switch } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css'
import Nav from './components/Nav'
import axios from 'axios'
import {API_URL} from './config'

class App extends React.Component {

  state = {
    loggedInUser: null,
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
        <Nav loggedInUser={this.state.loggedInUser} onLogout={this.handleLogOut} />
        <Switch >
          <Route path="/sign-in" render={(routeProps) => {
            return <SignIn onSignIn={this.handleSignIn} {...routeProps} />
          }} />
          <Route path="/sign-up" render={(routeProps) => {
            return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
          }} />
        </Switch>
      </div>
    );
  }

}

export default App;
