import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import ReactLinkify from 'react-linkify'

class CommentPanel extends Component {
    state = {
        likesCounter: this.props.feed.likes.length,
        comments: this.props.feed.comments,
        doShowSubComments: false,
        newComment: '',

    }

    clickLikes() {
        axios.put(`${API_URL}/feed/${this.props.feed._id}/addlike`, {}, { withCredentials: true })
            .then(() => {
                this.setState({
                    likesCounter: this.state.likesCounter + 1
                  
                })
            })
            .catch((err) => {
                console.log('An error ocurred: ' + err);
            })
    }

    


//      // method to show/hide form to add new comments
//   handleClick = () => {
//     this.setState({
//       form: !this.state.form
//     });
//   };

    clickComment() {
        // showComments
        this.setState((prevState) => {
            return ({
                doShowSubComments: !prevState.doShowSubComments
            })
        })
    }
    //falta newcomment, misma logica comment principal


    updateNewComment = (e) => {
        this.setState({
            newComment: e.target.value
        })
    }
    
    showSubComments() {
        return (
            <div>
                <div className="col-md-6">
                    <input onChange={this.updateNewComment} className="form-control col-md-5" />
                    <button onClick={() => this.props.addComment(this.props.feed._id, this.state.newComment)} className="btn btn-success">New Comment</button>
                </div>
                <div className="comment-list">
                    <ul>
                        {
                            this.props.feed.comments.map((elem) => {
                                return (
                                    <li>{elem.comment}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )

    }

    comments() {
        const { doShowSubComments } = this.state
        return (
            <div>
                <span>
                    <button onClick={() => this.clickComment()} className="btn btn-danger" type="button">Comment</button>
                </span>
                {doShowSubComments && this.showSubComments()}
            </div>
        )
    }

    render() {
        const { feed } = this.props
        const { likesCounter } = this.state
        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        const label = this.state.liked ? 'Unlike' : 'Like'

        return (
            <div className="mt-3 ml-3" key={feed._id}>
                <div className="row" >
                    <div className="col-md-2">
                        <img width="75px" height="75px" className="rounded" src="data:image/png;base64,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" alt="..." class="rounded-circle"></img>
                    </div>

                    <div class="text-left col-md-10">
                        {/* <h2 class="featurette-heading">{feed.name}</h2> */}
                       <ReactLinkify> {feed.description} </ReactLinkify>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <button className= "btn btn-danger">{likesCounter}</button>
                        <button className="btn btn-danger ml-4" onClick={() => this.clickLikes()}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg></button>
                    </div>
                    <div className="col-md-10  text-left">
                        {this.comments()}
                    </div>
                </div>


            </div>






        )
    }


}

export default CommentPanel;