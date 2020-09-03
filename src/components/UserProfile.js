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
                console.log('+++++++++++++++++++++++++++++++++++++++', res.data)
                this.setState({
                    user: res.data
                })

            })
            .catch((err) => {
                console.error('An error ocurred: ' + err);
            })
    }

    handleDelete = (id) => {
        axios.delete(`${API_URL}/profile/delete`, { withCredentials: true })
            .then(() => {
                // console.log(this.state.user)
                // let filteredUser = this.state.user.filter((user) => {
                //     return user._id !== user.session.loggedInUser._id
                // })

                this.setState({
                    user: null
                })

                this.props.history.push('/')
            })
    }


    render() {
        console.log(this.state.user)
        return (
            <Container fluid>
                {this.state.user &&
                    <Card centered margin>
                        <Image src={this.state.user.userAvatar} wrapped ui={false} />
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

                            <Icon name='user' />
                            {/* 22 Friends */}

                        </Card.Content>
                        <Link to="/user/edit">
                            <button type="button" class="btn btn-warning">Edit Profile</button>
                        </Link>


                        <button className="btn btn-dark mt-3" onClick={() => this.handleDelete()} > Delete Profile </button>

                    </Card>
                }
            </Container>
        )


    }
}

export default UserProfile