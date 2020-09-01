import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { Link } from "react-router-dom";


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
    render() {
        console.log(this.state.user)
        return (
            <div>
                <div className="text-center mt-3">
                    <div className="row" >
                        <div className="col-md-2">
                            <h1>Welcome {this.state.user.username}</h1>
                            <img src="data:image/https://i2.wp.com/www.acierta.mx/site/wp-content/uploads/2020/03/geek_gamer.png?fit=1400%2C800&ssl=1;base64,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" alt="" className="card-img-top" style={{ width: '4rem' }} />
                        </div>
                    </div>

                    <div class="col-md-10">
                        <h2 class="featurette-heading">TITULO</h2>
                        <h1>Name: {this.state.user.username}</h1>
                    </div>
                    <div class="col-md-10">
                        <h2>Email: {this.state.user.email}</h2>
                    </div>
                    <div class="col-md-10">
                        <h2>City: {this.state.user.city}</h2>
                    </div>
                    <div className="row">
                        


                        <Link to="/user/edit">
                            <button type="button" class="btn btn-warning">Edit Profile</button>
                        </Link>
                        <button className="btn btn-danger" onClick={() => this.deleteProfile()} > Delete Profile </button>
                    </div>
                </div>
            </div >

        )
    }
}

export default UserProfile