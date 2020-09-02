import React from 'react';
import axios from 'axios'
import { API_URL } from '../config'
import { Redirect } from 'react-router-dom';

export default class EditEvent extends React.Component {

    state = {
        event: this.props.event
    }
    componentDidMount() {
        // axios.get(`${API_URL}/events`, { withCredentials: true })
        //     .then((res) => {
        //         this.setState({
        //             event: res.data
        //         })
        //     })
    }

    handleEdit = (e) => {
        console.log(this.state.event)
        e.preventDefault();
        axios.put(`${API_URL}/event/${ this.state.event._id }/edit`, {
            name: this.state.event.name,
            topics: this.state.event.topics,
            image: this.state.event.image,
            city: this.state.event.city
        }, { withCredentials: true })
            .then((res) => {
                console.log(res)
                this.props.onClose() //para que se cierre el form del edit
            });
    }

    handlenameChange = (e) => {
        let eventEdited = JSON.parse(JSON.stringify(this.state.event))
        eventEdited.name = e.target.value

        this.setState({
            event: eventEdited
        })
    }

    handletopicsChange = (e) => {
        let eventEdited = JSON.parse(JSON.stringify(this.state.event))
        eventEdited.topics = e.target.value

        this.setState({
            event: eventEdited
        })
    }

    handleimageChange = (e) => {
        let eventEdited = JSON.parse(JSON.stringify(this.state.event))
        eventEdited.eventimage = e.target.value

        this.setState({
            event: eventEdited
        })
    }

    handleCityChange = (e) => {
        let eventEdited = JSON.parse(JSON.stringify(this.state.event))
        eventEdited.city = e.target.value

        this.setState({
            event: eventEdited
        })
    }

    render() {
        // if (!this.props.loggedInUser) {
        //     return <Redirect to='/signin' />
        // }
        // if (!this.state.event) {
        //     return (
        //         <div class="text-center">
        //             <div class="spinner-border" role="status">
        //                 <span class="sr-only">Loading...</span>
        //             </div>
        //         </div>
        //     )
        // }
        const { name, topics, image, city } = this.state.event
        return (
            <>
                <form >
                    <div class="form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" class="form-control"
                            onChange={this.handlenameChange} name="name" id="name" value={name} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="topics">topics</label>
                        <input type="text" class="form-control" onChange={this.handletopicsChange} name="topics" id="topics" value={topics} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="image">image</label>
                        <input type="text" class="form-control" onChange={this.handleAvatarChange} name="image" id="image" value={image} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" class="form-control" onChange={this.handleCityChange} name="city" id="city" value={city} />
                    </div>

                    <button type="button" class="btn btn-danger" onClick={this.handleEdit}>Edit event</button>

                </form>
            </>
        )
    }
}
