import React, { Component } from 'react'
import CommentPanel from './CommentPanel'
import { API_URL } from '../config'
import axios from 'axios'
import { Card, Container } from 'semantic-ui-react'

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
        axios.post(`${API_URL}/feed/create`, { description: this.state.description, typeComment: this.state.typeComment,  }, { withCredentials: true })
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

    //Button text, video and image, these functions will make the buttons only show for each type of text, making also a ternary conditional in EventsCards(155)
    handleButtonText(){
        this.setState({
            typeComment: "text"
        })
    }

    handleButtonVideo(){
        this.setState({
            typeComment: "video"
        })
    }

    handleButtonImage(){
        this.setState({
            typeComment: "image"
        })
    }

  
    render() {

        return (
            <Container centered>
                <Card fluid>
                    <div>
                        <div className="container mt-auto ml-auto mr-auto mb">
                            <div class="row mt-5">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <Card fluid>
                                        <h5 class="card-header">Welcome , what do you want to share today?</h5>
                                        <div class="card-body">
                                            <form>
                                                <div class="form-group">
                                                    <label for="wallInput" class="sr-only" placeholder="Write something">Write something</label>
                                                    <textarea class="form-control" id="wallInput" rows="2" name="description" placeholder="Write your comment here "
                                                        onChange={(e) => this.handleTextChange(e)}></textarea>
                                                </div>

                                               
                                            </form>
                                        

                                            <div class="float-right ">
                                                <div class="btn-group" role="group" aria-label="Basic example">
                                                    <button onClick={() => this.handleButtonText()} type="button" class="btn btn-secondary"><i class="fas fa-pencil-alt"></i> Text</button>
                                                    {/* <button onClick={() => this.handleButtonImage()} type="button" class="btn btn-secondary"><i class="far fa-image"></i> Photo</button> */}
                                                    <button onClick={() => this.handleButtonVideo()} type="button" class="btn btn-secondary"><i class="fas fa-video"></i> Video</button>
                                                </div>
                                               
                                                <div className="container-fluid">
                                            <button className="btn btn-warning"
                                                    onClick={() => this.sendComment()}
                                                >
                                                    Post
                                                 </button>

                                            </div>
                                            </div>
                            
                                        </div>
                                    </Card>
                                </div>
                            </div>

                        </div>
                        <div className="comment-list mb-5">

                            {
                                this.state.feeds.map((elem) => {
                                    return (
                                        <CommentPanel addComment={this.addComment} feed={elem} />
                                    )
                                })
                            }

                        </div>
                    </div>

                </Card>
            </Container>

        )
    }
}

export default Feed
