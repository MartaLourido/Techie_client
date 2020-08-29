import React, { Component } from 'react'
import { FeedStore } from '../models/feed'

class CommentPannel extends Component {
    state = {
        
    }
    clickLikes () {
       this.props.feed.likesCounter = this.props.feed.likesCounter+1
       //FeedStore.update()fgfhfgh

    }

    render() {
        const { feed } = this.props
        return (
            <li key={feed.id}>
                {feed.textComment}
                <p>
                    {feed.createdBy}
                </p>
                <p>
                    {feed.likesCounter}
                    <button onClick={ () => this.clickLikes() }>❤️</button>
                </p>
            </li>
        )
    }
}

export default CommentPannel;