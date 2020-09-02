import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { Link } from "react-router-dom";
import { Card, Icon, Image, Container } from 'semantic-ui-react'



class UserProfile extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        //aqui voy a colocar la ruta que conecte al backend, aqui va el axios con el /user
        this.getUser();
    }

    getUser() {

        axios.get(`${API_URL}/profile`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    user: res.data
                })

            })
            .catch((err) => {
                console.log('An error ocurred: ' + err);
            })
    }

    handleDelete = (id) => {
        axios.delete(`${API_URL}/profile/${id}`, { withCredentials: true })
            .then(() => {

                let filteredUser = this.state.user.filter((user) => {
                    return user._id !== id
                })

                this.setState({
                    user: filteredUser
                }, () => {
                    this.props.history.push('/Home')
                })

            })
    }


    render() {
        console.log(this.state.user)
        return (
            <Container fluid>
                <Card centered>
                    <Image src='https://pickaface.net/gallery/avatar/alae.harti5381250d2c781.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header> {this.state.user.username}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2020</span>
                        </Card.Meta>
                        <Card.Description>
                            Email: {this.state.user.email}
                            <br></br>
                        City: {this.state.user.city}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            {/* 22 Friends */}
                        </a>
                    </Card.Content>
                    <Link to="/user/edit">
                        <button type="button" class="btn btn-warning">Edit Profile</button>
                    </Link>
                    <button className="btn btn-dark mt-3" onClick={() => this.handleDelete()} > Delete Profile </button>
                </Card>
            </Container>
        )


    }
}

export default UserProfile