import React, { Component } from 'react'
import CommentPanel from './CommentPanel'
import {API_URL} from '../config' 
import axios from 'axios'
import {Card} from 'react-bootstrap'

export class Feed extends Component {

    state = {
        description: "",
        feeds: [],
      }
   
    componentDidMount() {
        //aqui voy a colocar la ruta que conecte al backend, aqui va el axios con el /feed
        this.getFeed();
    }
    
    getFeed () {

        axios.get(`${API_URL}/feed`, { withCredentials: true })
        .then((res) => {
            this.setState({
                feeds: res.data
            })

        })
        .catch((err) => {
            console.log ('An error ocurred: ' + err);
        })    
    }

    /**
     * Enviar al servidor
     */
    sendComment() {
        axios.post(`${API_URL}/feed/create`,  {description: this.state.description  }, { withCredentials: true})
        .then(() => {
                this.getFeed();
            })
            .catch((err) => {
                console.log ('An error ocurred: ' + err);
            })    
        }

   addComment = (id, comment) => {
       console.log(id, comment)
       axios.put(`${API_URL}/feed/${id}/addcomment`, {comment}, {withCredentials: true})
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
                <div className="input-comment-box">
                     <Card body>
                    <input className="form-control col-md-5" name="description" type="text" placeholder="Write your comment here "
                        onChange={(e) => this.handleTextChange(e)}
                    />
                    </Card>

                    <button className="btn btn-primary"
                        onClick={() => this.sendComment()}
                    >
                        Comment
                    </button>
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
