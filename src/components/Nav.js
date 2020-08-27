import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function myNav(props) {
    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Nav.Link href="/">Home</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/">Home</Link>
                    </Nav>
                   {
                       props.loggedInUser ? (
                        <Nav className="mr-auto">
                           <button onClick={props.onLogout}>Logout</button>
                        </Nav>
                       ) : (
                        <>   
                        <Nav className="mr-auto">
                            <Link to="/sign-in">Sign In</Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <Link to="/sign-up">Sign Up</Link>
                        </Nav>
                        </>
                       )
                   }
                </Navbar.Collapse>
                </Navbar>
        </div>
    )
}