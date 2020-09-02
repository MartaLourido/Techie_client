import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react'

export default function SignIn(props) {


    return (
        <>
            <div>
                <Message
                    attached
                    header='Login'
                />

                <Form onSubmit={props.onSignIn} className='attached fluid segment'>
                    <Form.Group widths='equal'>
                    </Form.Group>
                    <Form.Input label='Email' placeholder='Email' type='email' name='email' />
                    <Form.Input label='Password' type='password' name="password" />
                    <Button type="submit" color='yellow'>Log In</Button>
                </Form>

                <Message attached='bottom' warning>
                    <Icon name='help' />
        &nbsp;Don't have an account yet?<br></br><a href='/signup'>Sign Up</a>&nbsp;instead.
      </Message>
            </div>

            <form onSubmit={props.onSignIn}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>

                    <input type="email" className="form-control input-login" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Sign In!</button>
            </form>
        </>
    )   // )
}