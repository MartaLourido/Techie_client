import React, { Component } from 'react'
import CommentPanel from './CommentPanel'
import { API_URL } from '../config'
import axios from 'axios'
import { Card } from 'semantic-ui-react'

export class Feed extends Component {

    state = {
        description: "",
        feeds: [],
        feed: { createdby: "" },
    }

    componentDidMount() {
        //aqui voy a colocar la ruta que conecte al backend, aqui va el axios con el /feed
        this.getFeed();
    }

    getFeed() {

        axios.get(`${API_URL}/feed`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    feeds: res.data
                })

            })
            .catch((err) => {
                console.log('An error ocurred: ' + err);
            })
    }

    /**
     * Enviar al servidor
     */
    sendComment() {
        axios.post(`${API_URL}/feed/create`, { description: this.state.description }, { withCredentials: true })
            .then(() => {
                this.getFeed();
            })
            .catch((err) => {
                console.log('An error ocurred: ' + err);
            })
    }

    addComment = (id, comment) => {
        console.log(id, comment)
        axios.put(`${API_URL}/feed/${id}/addcomment`, { comment }, { withCredentials: true })
            .then(() => {
                this.getFeed()
            })
    }


    handleTextChange = (e) => {
        let updatedComment = e.target.value
        this.setState({
            description: updatedComment
        })
    }

    showThecomments() {
        this.setState({
            // feeds: FeedStore.getAll()
        })
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <h5 class="card-header">Wall</h5>
                                <div class="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="wallInput" class="sr-only" placeholder="Write something">Write something</label>
                                            <textarea class="form-control" id="wallInput" rows="2" name="description" placeholder="Write your comment here "
                                                onChange={(e) => this.handleTextChange(e)}></textarea>
                                        </div>

                                        <button className="btn btn-warning"
                                            onClick={() => this.sendComment()}
                                        >
                                            Post
                    </button>
                                    </form>

                                    <div class="float-right">
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" class="btn btn-secondary"><i class="fas fa-pencil-alt"></i> Text</button>
                                            <button type="button" class="btn btn-secondary"><i class="far fa-image"></i> Photo</button>
                                            <button type="button" class="btn btn-secondary"><i class="fas fa-video"></i> Video</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div clasName="mt-5"> */}
                        {/* <Card body centered>
                            <input className="form-control col-md-16" name="description" type="text" placeholder="Write your comment here "
                                onChange={(e) => this.handleTextChange(e)}
                            />
                            <button className="btn btn-warning"
                                onClick={() => this.sendComment()}
                            >
                                Comment
                    </button>
                        </Card>
                    </div> */}
                    {/* <button className="btn btn-primary"
                        onClick={() => this.sendComment()}
                    >
                        Comment
                    </button> */}
                </div>
                <div className="comment-list">
                    <ul>
                        {
                            this.state.feeds.map((elem) => {
                                return (
                                    <CommentPanel addComment={this.addComment} feed={elem} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

        )
    }
}

export default Feed
