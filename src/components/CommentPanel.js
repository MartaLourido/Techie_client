import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

class CommentPanel extends Component {
    state = {
        likesCounter: this.props.feed.likesCounter,
        comments: this.props.feed.comments,
        doShowSubComments: false
    }

    clickLikes() {
        axios.put(`${API_URL}/feed/${this.props.feed._id}/addlike`, {}, { withCredentials: true })
            .then(() => {
                //traer los likes del backend
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
    showSubComments() {
        return (
            <div>
                <div className="subcomment-box">
                    <input className="form-control col-md-5" />
                    <button className="btn btn-success">New Comment</button>
                </div>
                <div className="comment-list">
                    <div>
                        {
                            this.props.feed.comments.map((elem) => {
                                return (
                                    elem.comment
                                )
                            })
                        }
                    </div>
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

        return (
            <div className="text-center mt-3" key={feed._id}>
                <div className="row" >
                    <div className="col-md-2">
                        <img width="75px" height="75px" className="rounded" src="data:image/jpeg;base64,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" alt="..." class="rounded-circle"></img>
                    </div>

                    <div class="col-md-10">
                        <h2 class="featurette-heading">TITULO</h2>
                        <p class="lead"> {feed.description}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        {likesCounter}
                        <button className="btn btn-danger" onClick={() => this.clickLikes()}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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