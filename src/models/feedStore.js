// - createdBy -  type: ObjectId // required: true 
// - likesCounter  -  type: Numer // required: true
// - textComment  -  type: String // required: true
// - Comments  -  type: Array of Strings // required: true

import Axios from "axios"

const feedEjemplo ={
    id: '',
    createdBy: '',
    likesCounter: 0,
    textComment: '',
    comments: [
        '', ''
    ]
}
export class FeedStore {
    static store = []

    static create( feed ) {
        if( !feed.id ) {
            feed.id = FeedStore.generateId()
        }
        this.store.push( feed )
    }
    
    static get( id ) {
        // return this.store[ id ]
    }
    
    static update( feed ) {
        this.store.splice( this.store.find( elem => elem.id === feed.id ), 1, feed )
        console.log( "store content: ", this.store )
        // axios.put( 'http://localhost:4000/' + 'feed/' +feed.id+'/edit', JSON.parse( feed ) )
    }


    //funciones para crear un comentario 
    static generateId() {
        return Date.now()
    }

    static getCurrentUserId() {
        return 'a_mock_user_id'
    }

    static createComment(comment) {
        const feed = {
            textComment: comment,
            createdBy: this.getCurrentUserId(),
            likesCounter: 0,
            comments: []
        }
        this.create( feed )
    }

    static getAll (){
        return this.store 
    }
}