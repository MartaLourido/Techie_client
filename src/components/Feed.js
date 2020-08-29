import React, { Component } from 'react'
import { FeedStore } from '../models/feed'
import CommentPannel from './CommentPanel'

export class Feed extends Component {

    state = {
        feeds: [],
        comment: "",
    }

    componentDidMount() {
        //aqui voy a colocar la ruta que conecte al backend, aqui va el axios con el /feed
    }

    /**
     * Enviar al servidor
     */
    sendComment() {
        FeedStore.createComment(this.state.comment)
        this.showThecomments()
    }

    handleTextChange = (e) => {
        let updatedComment = e.target.value
        this.setState({
            comment: updatedComment
        })
    }

    showThecomments() {
        this.setState({
            feeds: FeedStore.getAll()
        })
    }

    render() {
        return (
            <div>
                <div className="input-comment-box">

                    <input name="name" type="text" placeholder="Write your comment here "
                        onChange={(e) => this.handleTextChange(e)}
                    />

                    <button
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
                                    <CommentPannel feed={elem}/>
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
