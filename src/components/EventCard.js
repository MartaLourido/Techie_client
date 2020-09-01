import React, { Component } from 'react'
import axios from "axios"
import Events from './Events'
import { API_URL } from '../config';
import { Redirect, Link } from 'react-router-dom';


export class EventCard extends Component {
    // constructor(props) {
    //     super(props)
    state = {
        event: { createdby: "" },
        eventId: this.props.match.params.id
    }
    // }

    componentDidMount() {
        axios.get(`${API_URL}/event/${this.props.match.params.id}`, { withCredentials: true })
            .then((res) => {
                console.log(res)
                this.setState({
                    event: res.data
                });
            })
            .catch(error => console.log(error))
    }

    render() {
        return (

            <div className="container">

                <div className="card" style={{ width: '18rem' }}>
                    <div className="col-md-12">
                        <img width="75px" height="75px" className="rounded" className="eventImg" src="https://1yfd8w35xqq41q3ou63czp8h-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/350x215-FEAT-in-post-eventtech.jpg" alt="event img"></img>
                    </div>
                    <div class="col-md-12">
                        <h3>{this.state.event.name}</h3>
                    </div>
                    <h4>{this.state.event.topics}</h4>
                    <h5>{this.state.event.place}</h5>
                    <p>{this.state.event.NumberOfPeople}</p>
                    <h5>{this.state.event.createdby.username}</h5>
                    <div className="card body">


                        <Link to="/AttendEvent">
                            <button type="button" class="btn btn-warning">Attend this event</button>
                        </Link>

                    </div>

                </div>
                <div>
                    <Link to="/events">
                        <button type="button" class="btn btn-warning">Go Back</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default EventCard