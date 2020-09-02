import React, { Component } from 'react'
import axios from "axios"
import { API_URL } from '../config';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

export class EventCard extends Component {
    // constructor(props) {
    //     super(props)
    state = {
        event: { createdby: "" },
        eventId: this.props.match.params.id,
        show: false,
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

    //modal

    handleClose = () => 
    this.setState({
        show: false
    });
    
 
    handleShow = () => 
    this.setState({
        show: true
    });

    render() {
        return (

            <div className="container">

                <div className="card" style={{ width: '30rem' }}>
                    <div className="col-md-12">
                        <img width="300px" height="200px" className="img-rounded mx-auto d-block" src="https://s27389.pcdn.co/wp-content/uploads/2018/07/tech-events-diary-1024x440.jpg" alt=""></img>
                    </div>
                    <div class="col-md-12">
                        <h3>{this.state.event.name}</h3>
                    </div>
                    <h4>{this.state.event.topics}</h4>
                    <h5>{this.state.event.place}</h5>
                    <p>{this.state.event.NumberOfPeople}</p>
                    <p>{this.state.event.description}</p>
                    <h5>{this.state.event.createdby.username}</h5>
                    <div className="card body">



                        <Button variant="primary" onClick={this.handleShow}>
                           Attend Event
                        </Button>


                    </div>

                </div>
                <div>
                    <Link to="/events">
                        <button type="button" class="btn btn-warning">Go Back</button>
                    </Link>

                </div>
                <>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're attending this event!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        )
    }
}

export default EventCard