# Techie

## Description

Techie is an application to find people in tech, go to events, post and recommend articles.

## User Stories

- *As a user,*  I want to be able to access the homepage and be able to sign up or login.
- *As a user,*  As a user I want to see an error page when an error happens.
- *As a user,* I can create an account and log in
- *As a user,*  By logging in I can see my user profile, which I can edit and delete the account.
- *As a user,*  I can log out, which will also be done when I delete the account
- *As a user,*  I can search for events near me that interest me
- *As a user,* I can create events
- *As a user,* I can edit and delete events I have created
- *As a user,*  I can check to attend events that I will be attending so I can know who else will be attending 
- *As a user,*  Events can be seen by date and type of information 
- *As a user,* I can create a post to share a news, a link or something I have seen interesting about tech
- *As a user,* I can edit my posts
- *As a user,* I can delete my posts
- *As a user,* I can give like to the posts of others and add them to favorites


### Backlog

- Adding an API
- Be able to do share of the post in social media 
- Improve code 
- Responsiveness
- Add a map where you can see the events near me
- Add a chat to talk to other users
- Look for courses near you



# Client

## Routes

- /signup
- /login
- /logout
- /profile
- /profile/edit-profile
- /profile/feed
- /Event-finder
- /Event-description
- /Event-description/create-event
- /search/events
- /search/posts
- /comments/add-post

## Pages

- Home Page (public)
- Sign up Page (public)
- User profile (user only)
- Edit user profile (user only)
- Feed page (user only)
- Event-finder page (user only)
- Event-description page (user only)
- Create-event page (user only)
- 404 Page (public)

## Components

- Search component
- Navbar
- AddForm
- EditForm
- SignIn
- SignUp

## Services

### Auth Service

- auth.login(user)
- auth.signup(user)
- auth.logout()

# Server

## Models

### User Model

- username - String // required
- email - String // required & unique
- password - String // required
- userAvatar  -  type: String 


### Post Model

- createdBy -  type: ObjectId // required: true 
- likesCounter  -  type: Numer // required: true
- textComment  -  type: String // required: true
- Comments  -  type: Array of Strings // required: true

### Events Model

- createdBy -  type: ObjectId // required: true
- textComment  -  type: String // required: true
- Comments  -  type: Array of Strings // required: true
- Date -  type: Number // required: true
- Place - typl: String // required: true
- Topics -  type: Array of Strings // required: true
- NumberOfPeople - type: Array of objectIds // required: true

## Backend Routes

- GET /auth
- POST /auth/signup
body:
username
email
password

- POST /auth/login
body:
username
password

- POST /auth/logout
body: (empty)
- POST /user/me/favorite
body:
userId
- DELETE /user/me/favorite/:userId
body: (empty)
-  GET /event
- POST /event
body:Event , event counter, text comment, time, place, number of people
- GET /event/:id
- DELETE /event/:id
- EDIT /event/:id
-  GET /feed


# Links 

# Trello

Link to your trello board or picture of your physical board https://trello.com/b/MZaW4i5D/techie

# Git

The url to your repository and to your deployed project 
- https://github.com/MartaLourido/Techie_client

- https://github.com/MartaLourido/Techie_server

Repository Link

Deploy Link

# Slides

The url to your presentation slides

Slides Link
