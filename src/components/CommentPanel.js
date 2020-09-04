import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import ReactLinkify from 'react-linkify'
import { Button, Comment, Form, Container, Card } from 'semantic-ui-react'
import moment from 'moment' //for change the format date 
import ReactPlayer from "react-player" //for be able to share url videos
// import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, LinkedinIcon, FacebookIcon, TwitterShareButton, FacebookShareCount, shareUrl } from "react-share" //this is an API for be able to share post or events in social media  



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
                <div className= "mt-2">
                    <button onClick={() => this.clickComment()} className="btn btn-warning" type="button">Comments</button>
                </div>
                {doShowSubComments && this.showSubComments()}
            </div>
        )
    }



    render() {
        const { feed } = this.props
        const { likesCounter } = this.state
        console.log(feed)
        let shareUrl = window.location.href;

        return (
            <div>
                <div class="card gedf-card mr-5 mt-5 ml-5">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src={feed.createdby && feed.createdby.userAvatar} alt="" />
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">{feed.createdby.username}</div>
                                    <div class="h7 text-muted">{feed.name}</div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>

                    </div>
                </div>

                <div class="card-body">
                    <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> {moment(feed.createAt).format('DD/MM/YYYY')}</div>

                    <p class="card-text">
                        {feed.typeComment === "video" ?
                            <card>
                                <ReactPlayer

                                    width="100%"


                                    url={feed.description}

                                />
                            </card>
                            : (
                                (
                                    <ReactLinkify> {feed.description} </ReactLinkify>)
                            )

                        }
                    </p>


                    <div class="align-center">

                        <div className = "mt-2">
                        <Button onClick={() => this.clickLikes()}
                            color='red'
                            
                            content='Like'
                            icon='heart'
                            label={{ basic: true, color: 'red', pointing: 'left', content: <div>{likesCounter}</div> }}
                        />
                        </div>
                        {this.comments()}
                        {/* <LinkedinShareButton url={`${shareUrl}`}>

                            <LinkedinIcon size={32} round={true} />

                        </LinkedinShareButton>
                        <FacebookShareButton url={`${shareUrl}`}>

                            <FacebookIcon size={32} round={true} />

                        </FacebookShareButton>
                         */}

                    </div>


                </div >
            </div>





        )
    }


}

export default CommentPanel;