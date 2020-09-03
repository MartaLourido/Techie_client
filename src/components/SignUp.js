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
        <Button type="submit" color='yellow'>Register now!</Button>
      </Form>
      
      <Message attached='bottom' warning>
        <Icon name='help' />
        Already signed up?&nbsp;<a href='/signin'>Login here</a>&nbsp;instead.
      </Message>
   
    </div>
    

    )
}