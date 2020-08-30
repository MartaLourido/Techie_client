import React, { Component } from 'react'
import { FeedStore } from '../models/feedStore'

class CommentPannel extends Component {
    state = {
        likesCounter: this.props.feed.likesCounter,
        comments: this.props.feed.comments,
        doShowSubComments: false
    }

    clickLikes() {
        this.setState((prevState) => {
            let newLikesCounter = prevState.likesCounter + 1

            const feed = {
                ...this.props.feed,
                likesCounter: newLikesCounter
            }

            FeedStore.update(feed)

            return ({
                likesCounter: newLikesCounter
            })
        })
    }

    clickComment() {
        // showComments
        this.setState((prevState)=>{
            return ({
                doShowSubComments: !prevState.doShowSubComments
            })
        })
    }
    //falta newcomment, misma logica comment principal
    showSubComments() {
        return(
            <>
                <div className="subcomment-box">
                    <input/>
                    <button>New Comment</button>
                </div>
                <div className="comment-list">
                    <ul>
                        {
                            this.props.feed.comments.map((elem) => {
                                return (
                                    {elem} 
                                )
                            })
                        }
                    </ul>
                </div>
            </>
        )
    }

    comments() {
        const {doShowSubComments} = this.state
        return (
            <>
                <span>
                    <button onClick={() => this.clickComment()}>Comment</button>
                </span>
                { doShowSubComments && this.showSubComments() }
            </>
        )
    }

    render() {
        const { feed } = this.props
        const { likesCounter } = this.state

        return (
            <li key={feed.id}>
                {feed.textComment}
                <p>
                    {feed.createdBy}
                </p>
                {this.comments()}
                <span>
                    {likesCounter}
                    <button onClick={() => this.clickLikes()}>❤️</button>
                </span>
            </li>
        )
    }


}

export default CommentPannel;