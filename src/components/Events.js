import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardGroup } from 'react-bootstrap'

// import SearchEvent from './SearchEvent'


export class Events extends Component {

    state = {
        events: [],
        // filteredEvents: events
        image: "",
        cities: ["", "Madrid", "Amsterdam", "Stockholm", "Barcelona"],
        filteredEvents: [],
        loggedInUser: null,


    }

    //get the events

    componentDidMount() {
        axios.get(`${API_URL}/events`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    events: res.data,
                    filteredEvents: res.data,
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.history.push('/signin')
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


    //search by city, name or topic

    handleSearch = (e) => {
        // e.preventDefault(e)

        let searchText = e.currentTarget.value
        let filteredAll = this.state.events.filter((event) => {
            console.log(event)
            return (

                event.city.toLowerCase().includes(searchText.toLowerCase())
                || event.name.toLowerCase().includes(searchText.toLowerCase()) ||
                event.topics.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        this.setState({
            filteredEvents: filteredAll

        })

    }

    //filter by event that i created 
    handleMyEvents = (e) => {
        let filteredEvents = this.state.events.filter((event) => {
            return event.createdby._id === this.state.loggedInUser._id
        })
        this.setState({
            filteredEvents: filteredEvents

        })
    }

    handleAllEvents = () => {
        this.setState({
            filteredEvents: this.state.events
        })
    }



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

    //trying to implement a filter

    // onFilterChange = ({ filters }) => {
    //     this.setState({ filters });
    //   }


    //delete an event that you created

    handleDelete = (id) => {

        let newEvent = this.state.events.filter((event) => {
            return event.createdby.username !== id
        })

        this.setState({
            events: newEvent
        }, () => {
            this.props.history.push('/Events')
        })
        console.log(this.state.events)
    }


    //Edit a event that you created 

    handleEdit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.id
        axios.patch(`${API_URL}/event/${id}`, { withCredentials: true },
            {
                name: this.state.events.name,
                information: this.state.events.information,
                topics: this.state.events.topics

            })
            .then((res) => {
                return (
                    <Redirect to='/events' />
                )
            })
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.get(`${API_URL}/events/search`,{searchText: searchText} { withCredentials: true })
    //         .then((res) => {
    //             this.setState({
    //                 events: res.data
    //             })
    //         })
    //         .catch((err) => {
    //             if (err.response.status === 401) {
    //                 this.props.history.push('/Events')
    //             }
    //         })
    // }




    render() {



        return (
            <div className="mt-3">


                <nav class="navbar navbar-light bg-light justify-content-between">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="search" aria-label="search"
                            className="input"
                            value={this.state.input}
                            onChange={this.handleSearch}
                        />

                    </form>
                    <button type="button" class="btn btn-danger" onClick={this.handleMyEvents}>My Events</button>
                    <button type="button" class="btn btn-secondary" onClick={this.handleAllEvents}>All the Events</button>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Cities</label>

                        <select class="form-control"
                            value={this.state.cities}
                            onChange={this.handleSearchCity}
                            id="city"
                            name="city"

                        >

                            {
                                this.state.filteredEvents.map((elem) => {
                                    return (
                                        <option value={elem}>{elem.city}</option>
                                    )

                                })
                            }

                        </select>
                    </div>
                </nav>
                <div className="mt-5 mb-5">

                    <Link to="/CreateEvent">
                        <button type="button" class="btn btn-warning">Create new event</button>
                    </Link>

                </div>

                {
                    this.state.filteredEvents.map((elem) => {

                        return (


                            <div>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="https://s27389.pcdn.co/wp-content/uploads/2018/07/tech-events-diary-1024x440.jpg" alt="" />
                                        <Card.Body>
                                            <Card.Title>{elem.name}</Card.Title>
                                            <Card.Text>
                                                <h5>{moment(elem.date).format('DD/MM/YYYY')}</h5>
                                                <h4>Topic of the day: {elem.topics}</h4>
                                                <h4><span>📍</span>{elem.city}</h4>

                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>

                                            <Link to={`/event/${elem._id}`}>
                                                <button type="button" class="btn btn-outline-warning">I am interested!</button>
                                            </Link>
                                        </Card.Footer>

                                    </Card>
                                </CardGroup>

                                <div className="mt-4 mb-4">


                                    {
                                        this.props.loggedInUser ? (
                                            <div>

                                                <button type="button" class="btn btn-outline-warning" onClick={this.handleDelete}>Delete</button>


                                                <button type="button" class="btn btn-outline-warning" onClick={this.handleEdit}>Edit</button>

                                            </div>

                                        ) : ""

                                    }
                                </div>
                            </div>



                        )
                    })
                }

            </div >


        )
    }
}

export default Events
