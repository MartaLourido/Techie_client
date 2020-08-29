// - createdBy -  type: ObjectId // required: true 
// - likesCounter  -  type: Numer // required: true
// - textComment  -  type: String // required: true
// - Comments  -  type: Array of Strings // required: true

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
        console.log( "store content: ", this.store )
    }

    static get( id ) {
        // return this.store[ id ]
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