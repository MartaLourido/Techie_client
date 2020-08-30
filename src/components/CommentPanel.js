import React, { Component } from 'react'
import { FeedStore } from '../models/feedStore'

class CommentPannel extends Component {
    state = {
        likesCounter: this.props.feed.likesCounter
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

    render() {
        const { feed } = this.props
        const { likesCounter } = this.state

        return (
            <li key={feed.id}>
                {feed.textComment}
                <p>
                    {feed.createdBy}
                </p>
                <p>
                    {likesCounter}
                    <button onClick={() => this.clickLikes()}>❤️</button>
                </p>
            </li>
        )
    }
}

export default CommentPannel;