import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardGroup } from 'react-bootstrap'
import EditEvent from './EditEvent'

// import SearchEvent from './SearchEvent'


export class Events extends Component {
    

    state = {
        events: [],
        // filteredEvents: events
        image: "",
        cities: ["", "Madrid", "Amsterdam", "Stockholm", "Barcelona"],
        filteredEvents: [],
        loggedInUser: null,
        showEditEvent: false,


    }

    //get the events

    componentDidMount() {
        this.getEvents();
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


    //when you edit a event, then get the event edited
    getEvents() {
        axios.get(`${API_URL}/events`, { withCredentials: true })
            .then((res) => {
                axios.get(`${API_URL}/user`, { withCredentials: true })
                    .then((user) => {
                        this.setState({
                            events: res.data,
                            filteredEvents: res.data,
                            loggedInUser: user.data
                        })
                    })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    this.props.history.push('/')
                }
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
        console.log(this.state.loggedInUser)
        let filteredEvents = this.state.events.filter((event) => {
            return event.createdby === this.state.loggedInUser._id
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


    //delete an event that you created

    // handleDelete = (id) => {

    //     let newEvent = this.state.events.filter((event) => {
    //         return event.createdby.username !== this.state.loggedInUser._id
    //     })

    //     this.setState({
    //         events: newEvent
    //     }, () => {
    //         this.props.history.push('/events')
    //     })
    //     console.log(this.state.events)
    // }

    handleDelete = (e) => {
        // e.preventDefault()
        console.log(e.target.getAttribute("data"))
       let id = e.target.getAttribute("data")
        axios.delete(`${API_URL}/event/${id}/delete`, { withCredentials: true })
            .then(() => {


                this.getEvents()
            })
    }

    //Edit a event that you created 

    handleEdit = (event) => {
        console.log(event)
        this.setState({
            showEditEvent: true,
        })

        // let id = this.props.match.params.id
        // axios.put(`${API_URL}/events/${id}/edit`, { withCredentials: true },
        //     {
        //         name: this.state.events.name,
        //         information: this.state.events.information,
        //         topics: this.state.events.topics

        //     })
        //     .then((res) => {
        //         return (
        //             <Redirect to='/events' />
        //         )
        //     })
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
    //                 this.props.history.push('/events')
    //             }
    //         })
    // }




    render() {



        return (
            <div className="mt-3">


                <nav class="navbar navbar-light bg-light justify-content-between">
                    <form class="form-inline">
                        <input type="text" placeholder="search an event" aria-label="search"
                            className="input form-control mr-sm-2"
                            value={this.state.input}
                            onChange={this.handleSearch}
                        />

                    </form>
                    <button type="button" class="btn btn-danger" onClick={this.handleMyEvents}>My Events</button>
                    <button type="button" class="btn btn-secondary" onClick={this.handleAllEvents}>All the Events</button>
                    {/* <div class="form-group">
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
                    </div> */}
                </nav>
                <div className="mt-5 mb-5">

                    <Link to="/createvent">
                        <button type="button" class="btn btn-warning">Create new event</button>
                    </Link>

                </div>

                {
                    this.state.filteredEvents.map((elem) => {

                        return (


                            <div className>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src={elem.image} alt="" />
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
                                        this.props.loggedInUser._id === elem.createdby ? (
                                            <div>
                                                <h5>You have been created this event!</h5>
                                                <button data={elem._id} type="button" class="btn btn-outline-warning" onClick={this.handleDelete}>Delete</button>

                                                {/* <Link to="/events/edit"> */}
                                                <button type="button" class="btn btn-outline-warning" onClick={this.handleEdit}>Edit</button>
                                                {/* </Link> */}



                                            </div>

                                        ) : ""

                                    }
                                </div>
                                {/*  con el showEditEvent hacemos que se muestre el form en el edit event, despues con el onclose hacemos que se cierre con lo que hemos editado guardandolo*/}
                                {this.state.showEditEvent &&
                                    <EditEvent
                                        event={elem}
                                        onClose={() => {this.setState({ showEditEvent: false }); this.getEvents()}} 
                                    />
                                }
                            </div>



                        )
                    })
                }

            </div >


        )
    }
}

export default Events
