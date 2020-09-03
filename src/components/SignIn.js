import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react'

export default function SignIn(props) {


    return (
        <div>
        <Message
        attached
        header='Log In'
       
      />
     
      <Form onSubmit={props.onSignIn} className='attached fluid segment'>
        <Form.Group widths='equal'>
        </Form.Group>
       
        <Form.Input label='Email' placeholder='Email' type='Email' name='email'/>
        <Form.Input label='Password' type='password' name="password" />
       

        
        <Button type="submit" color='yellow'>Log In</Button>
      </Form>
      
      <Message attached='bottom' warning>
        <Icon name='help' />
        Still don't have an account?&nbsp;<a href='/signup'>Sign up here</a>&nbsp;instead.
      </Message>
   
    </div>
    )
}