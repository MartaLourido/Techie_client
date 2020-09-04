import React, { Component } from 'react'
import axios from "axios"
import { API_URL } from '../config';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Card, Icon, Image, Grid, Container } from 'semantic-ui-react'
import moment from 'moment'

export class EventCard extends Component {
  
    state = {
        event: { createdby: "" },
        eventId: this.props.match.params.id,
        show: false,
        text: 'Attend event',
    }
    

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

    //added the text Attended for change the button when you press in Attend (Setted in the state)    

    handleShow = () =>
        this.setState({
            show: true,
            text: "Attended"
           
        });

 
    render() {
        return (

            <div className="container mt-5">

                <Container fluid>
                    <Card centered>

                        <Image src=
                        {this.state.event.image} wrapped ui={false} />
                        <Card.Content>
                            <h4>{moment(this.state.event.date).format('DD/MM/YYYY')}</h4>
                            <Card.Header>{this.state.event.name}</Card.Header>
                            <Card.Description> 📍 {this.state.event.place}, {this.state.event.city}</Card.Description>
                            <Card.Meta>
                                <h4>{this.state.event.topics}</h4>
                                
                            </Card.Meta>
                            <Card.Description>

                                <h5>{this.state.event.information}</h5>
                                <span className='text'>Created by {this.state.event.createdby.username}</span>
                                <span className='date'>- {moment(this.state.event.createdAt).format('DD/MM/YYYY')}</span>
                               
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                {this.state.event.numberOfPeople} 
                            </a>
                        </Card.Content>
                        
                        <Button variant="primary" onClick={this.handleShow}>
                            {this.state.text}
                        </Button>

                    </Card>


                </Container>
         
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