import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { Redirect, Link } from 'react-router-dom';
import Search from './Search'

export class Events extends Component {

    state = {
        events: []
        // filteredEvents: events
    }

    //get the events

    componentDidMount() {
        axios.get(`${API_URL}/events`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    events: res.data
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.history.push('/SignIn')
                }
            })
    }

    showTheEvent() {
        axios.post(`${API_URL}/event`, { withCredentials: true })
            .then(() => {
                return (
                    <Redirect to='/EventCard' />
                )
            })
            .catch((err) => {
                console.log('An error ocurred: ' + err);
            })
    }

    //       // method for the search filter functionality. Invoked in Search.
    // filterEvents = input => {
    //     const filtered = this.state.Events.filter(el => el.name.toLowerCase().includes(input.toLowerCase()));
    //     this.setState({ filtered });
    // };

    // //method for sort by city and topic

    // sortEvents = field => {
    //     // copy of state as not to mutate original
    //     const sortedEvents = [...this.state.firstVisibleEvents];
    //     // different sort based on field parameter (reduced syntax for both)
    //     if (field === 'city') sortedEvents.sort((a, b) => b.city > a.city ? -1 : 1) // sort for strings
    //     else if (field === 'topic') sortedEvents.sort((a, b) => b.topic > a.topic ? -1 : 1)

    //     // setting the state with the sorted array
    //     this.setState({
    //         firstVisibleEvents: sortedEvents
    //     });
    // }

    render() {
        return (
            <div className="mt-3">

                <Search />
                <div className="mt-5 mb-5">
                    <Link to="/CreateEvent">
                        <button type="button" class="btn btn-warning">Create new event</button>
                    </Link>
                    
                </div>

                {
                    this.state.events.map((elem) => {
                        return (
                            <div class="card-deck m-5">
                                <div class="card">
                                    <div className="mt-3" >
                                        <div className="image">
                                            <img width="300px" height="200px" className="img-rounded mx-auto d-block" src="https://area51.co/wp-content/grand-media/image/linkedin_ice_cave.jpg" alt="event img"></img>
                                        </div>
                                        <div class="col-md-12 text-center">
                                            <h3>{elem.name}</h3>
                                        </div>
                                        <h4>Topic of the day: {elem.topics}</h4>
                                        <h4>📍{elem.city}</h4>
                                        {/* <h5>{elem.place}</h5> */}
                                        {/* <p>{elem.numberOfPeople}</p> */}
                                        <h5>{elem.createdby.username}</h5>
                                        <div className="mt-4 mb-4">
                                            <Link to={`/event/${elem._id}`}>
                                                <button type="button" class="btn btn-warning">I am interested!</button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }

            </div>


        )
    }
}

export default Events
