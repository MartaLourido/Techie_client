import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import ReactLinkify from 'react-linkify'
import { Button, Comment, Form, Embed } from 'semantic-ui-react'
import moment from 'moment' //for change the format date 
import ReactPlayer from "react-player" //for be able to share url videos
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, TwitterShareButton } from "react-share" //this is an API for be able to share post or events in social media  
import { FacebookIcon,  WhatsappIcon,   LinkedinIcon,   TwitterIcon} from "react-share";

import Clock from 'moment'

class CommentPanel extends Component {
    state = {
        likesCounter: this.props.feed.likes.length,
        comments: this.props.feed.comments,
        image: this.props.feed.userAvatar,
        doShowSubComments: false,
        newComment: '',
        feed: { createdby: "" }, //for show the name of the user who creates it
        typeComment: 'text'


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

    clickComment() {
        // showComments
        this.setState((prevState) => {
            return ({
                doShowSubComments: !prevState.doShowSubComments
            })
        })
    }
    //for update the comment


    updateNewComment = (e) => {
        this.setState({
            newComment: e.target.value
        })
    }

    //for see the sub comments of the feed (panel)
    showSubComments() {
        console.log("running showSubComments")
        return (
            <div>
                {/* <div className="col-md-6">
                    <input onChange={this.updateNewComment} className="form-control col-md-5" />
                    <button onClick={() => this.props.addComment(this.props.feed._id, this.state.newComment)} className="btn btn-success">New Comment</button>
                </div> */}
                <div className="comment-list mt-4">
                    <>
                        <Comment.Group>
                            {
                                this.props.feed.comments.map((elem) => {
                                    return (


                                        <div class="pointer-border">
                                            <Comment>
                                                <Comment.Avatar as='a' src={elem.createdby && elem.createdby.userAvatar} />
                                                <Comment.Content>
                                                    <Comment.Author>created by {elem.createdby.username}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{moment(elem.createAt).format('DD/MM/YYYY')}</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{
                                                        elem.comment}



                                                    </Comment.Text>
                                                    <Comment.Actions>
                                                        {/* <Comment.Action>Reply</Comment.Action> */}
                                                    </Comment.Actions>
                                                </Comment.Content>

                                            </Comment>

                                        </div>

                                    )

                                })
                            }
                        </Comment.Group>
                        <Form reply>
                            <Form.TextArea onChange={this.updateNewComment} />
                            <Button onClick={() => this.props.addComment(this.props.feed._id, this.state.newComment)} content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    </>
                </div>
            </div>
        )

    }

    comments() {
        console.log("comment clicked")
        const { doShowSubComments } = this.state
        console.log(doShowSubComments)
        return (
            <div>
                <span>
                    <button onClick={() => this.clickComment()} className="btn btn-warning" type="button">Comments</button>
                </span>
                {doShowSubComments && this.showSubComments()}
            </div>
        )
    }



    render() {
        const { feed } = this.props
        const { likesCounter } = this.state
        console.log(feed)


        return (

            <div className="mt-3 ml-3" key={feed._id}>
                <div className="row" >
                    <div className="col-md-2">
                        <img width="75px" height="75px" className="rounded" src={feed.createdby && feed.createdby.userAvatar} alt="..." class="rounded-circle"></img>
                        <Comment.Author>{feed.createdby.username}</Comment.Author>

                        <div>{moment(feed.createAt).format('DD/MM/YYYY')}</div>
                    </div>

                    <div class="text-left col-md-10">
                        {/* <h2 class="featurette-heading">{feed.name}</h2> */}

                        {feed.typeComment === "video" ?
                            <card>
                                <ReactPlayer

                                    width="auto"
                                    height=" auto"

                                    url={feed.description}

                                />
                            </card>
                            : (
                                (
                                    <ReactLinkify> {feed.description} </ReactLinkify>)
                            )

                        }

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        {/* <button className="btn btn-danger">{likesCounter}</button>
                        <button className="btn btn-danger ml-4" onClick={() => this.clickLikes()}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg></button> */}
                        <Button onClick={() => this.clickLikes()}
                            color='red'
                            content='Like'
                            icon='heart'
                            label={{ basic: true, color: 'red', pointing: 'left', content: <div>{likesCounter}</div> }}
                        />
                        <FacebookShareButton/>
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