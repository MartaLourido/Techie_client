import React, { Component } from 'react';
import { API_URL } from '../config';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            createdby: "",
            place: "",
            numberOfPeople: 0,
            topics: "",
            city: "",
            image: null,
            date: new Date(),
            description: "",
        };

        this.onImageChange = this.onImageChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, date, place, topics, numberOfPeople, city, image, description } = this.state;
        axios.post(`${API_URL}/event/create`, { name: name, date: date, place: place, topics: topics, numberOfPeople: numberOfPeople, city: city, image: image, description: description }, { withCredentials: true })
            .then(res => {
                this.props.history.push('/events')
            })

    }

    handleInput = e => {
        console.log(e);
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

  
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group row">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInput}
                        />
                        <label for="Date">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={this.state.date}
                            onChange={this.handleInput}
                            className="form-control"
                        />

                        <label for="Topics">Topics</label>
                        <input
                            type="text"
                            name="topics"
                            value={this.state.topics}
                            onChange={this.handleInput}
                            className="form-control"
                        />
                        <label for="NumberOfPeople">Number of people</label>
                        <input
                            type="number"
                            name='numberOfPeople'
                            className="form-control"
                            value={this.state.numberOfPeople}
                            onChange={this.handleInput}
                        />
                        <label for="City">City</label>
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            value={this.state.city}
                            onChange={this.handleInput}
                        />
                        <label for="Place">Place </label>
                        <input
                            type="text"
                            name="place"
                            className="form-control"
                            value={this.state.place}
                            onChange={this.handleInput}
                        />
                           <label for="Place">Description </label>
                        <input
                            type="description"
                            name="description"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleInput}
                        />


                    </div>
                    {/* <div class="custom-file mt-3" >
                        <input type="file" class="custom-file-input" id="image"
                            value={this.state.image}
                            onChange={this.handleInput}
                        />
                        <label class="custom-file-label" for="image">Choose image</label>
                        
                    </div> */}
                    <div>
                        <img src={this.state.image} />
                        <h5>Select Image</h5>
                        <input type="file" name="myImage" onChange={this.onImageChange} />
                    </div>

                    <button type="submit" class="btn btn-warning mt-3">Save</button>
                </form>
                <Link to="/Events">
                    <button type="button" className="btn btn-secondary mt-2">Go back</button>
                </Link>
            </div>
        );
    }
}


export default CreateEvent;