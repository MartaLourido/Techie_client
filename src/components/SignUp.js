import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react'


export default function SignUp(props){
    return (
        <div>
        <Message
        attached
        header='Welcome to our site!'
        content='Fill out the form below to sign-up for a new account'
      />
     
      <Form onSubmit={props.onSignUp} className='attached fluid segment'>
        <Form.Group widths='equal'>
        </Form.Group>
        <Form.Input label='Username' placeholder='Username' type='text'name='username' />
        <Form.Input label='Email' placeholder='Email' type='Email' name='email'/>
        <Form.Input label='Password' type='password' name="password" />
        <Form.Input label='User Avatar' type='url' name="avatar" />

        <Form.Checkbox inline label='I agree to the terms and conditions' />
        <Button type="submit" color='yellow'>Submit</Button>
      </Form>
      
      <Message attached='bottom' warning>
        <Icon name='help' />
        Already signed up?&nbsp;<a href='/signin'>Login here</a>&nbsp;instead.
      </Message>
   
    </div>
    
        // <form onSubmit={props.onSignUp}>
        //     <div className="form-group">
        //         <label htmlFor="exampleInputUsername">Username</label>
        //         <input type="text" className="form-control" id="exampleInputUsername" name="username" />
        //     </div>
        //     <div className="form-group">
        //         <label htmlFor="exampleInputEmail1">Email address</label>
        //         <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
        //         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        //     </div>
        //     <div className="form-group">
        //         <label htmlFor="exampleInputPassword1">Password</label>
        //         <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
        //     </div>
        //     <button type="submit" className="btn btn-primary">Sign Up!</button>
        // </form>
    )
}