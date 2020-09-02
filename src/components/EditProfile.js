import React from 'react';
import axios from 'axios'
import { API_URL } from '../config'
import { Redirect } from 'react-router-dom';

export default class EditProfile extends React.Component {

    state = {
        user: {}
    }
    componentDidMount() {
        axios.get(`${API_URL}/profile`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    user: res.data
                })
            })
    }

    handleEdit = (e) => {
        console.log(this.state.user)
        e.preventDefault();
        axios.put(`${API_URL}/profile/edit`, {
            username: this.state.user.username,
            email: this.state.user.email,
            userAvatar: this.state.user.userAvatar,
            city: this.state.user.city
        }, { withCredentials: true })
            .then((res) => {
                console.log(res)
                this.props.history.push("/user");
            });
    }

    handleUsernameChange = (e) => {
        let userEdited = JSON.parse(JSON.stringify(this.state.user))
        userEdited.username = e.target.value

        this.setState({
            user: userEdited
        })
    }

    handleEmailChange = (e) => {
        let userEdited = JSON.parse(JSON.stringify(this.state.user))
        userEdited.email = e.target.value

        this.setState({
            user: userEdited
        })
    }

    handleAvatarChange = (e) => {
        let userEdited = JSON.parse(JSON.stringify(this.state.user))
        userEdited.userAvatar = e.target.value

        this.setState({
            user: userEdited
        })
    }

    handleCityChange = (e) => {
        let userEdited = JSON.parse(JSON.stringify(this.state.user))
        userEdited.city = e.target.value

        this.setState({
            user: userEdited
        })
    }

    render() {
        if (!this.props.loggedInUser) {
            return <Redirect to='/SignIn' />
        }
        if (!this.state.user) {
            return (
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        const { username, email, userAvatar, city } = this.state.user
        return (
            <>
                <form >
                    <div class="form-group">
                        <label htmlFor="name">Username</label>
                        <input type="text" class="form-control"
                            onChange={this.handleUsernameChange} name="username" id="username" value={username} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" class="form-control" onChange={this.handleEmailChange} name="email" id="email" value={email} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="userAvatar">Avatar</label>
                        <input type="text" class="form-control" onChange={this.handleAvatarChange} name="avatar" id="avatar" value={userAvatar} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" class="form-control" onChange={this.handleCityChange} name="city" id="city" value={city} />
                    </div>

                    <button type="button" class="btn btn-danger" onClick={this.handleEdit}>Edit Profile</button>

                </form>
            </>
        )
    }
}
