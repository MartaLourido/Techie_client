import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

export class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <a className="navbar-brand" href="/">
                        <img src="logo.png" height="100" className="d-inline-block align-top" alt="" loading="lazy" />

                    </a>
                    <Navbar.Brand href="#home">Welcome to Techie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">



                            {
                                this.props.loggedInUser ? (
                                    <>
                                        <NavDropdown title="Profile" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/User">My Profile</NavDropdown.Item>
                                            <NavDropdown.Divider />

                                        </NavDropdown>
                                        <Nav>
                                            <Nav.Link href="/Feed">Feed</Nav.Link>
                                            <Nav.Link href="/Events">Events</Nav.Link>
                                            <Nav.Link href="/ExampleCard">Card</Nav.Link>
                                        </Nav>

                                        <button onClick={this.props.onLogout}>Logout</button>
                                    </>
                                ) : (
                                        <>
                                            <Nav>
                                                <Nav.Link href="/SignIn">Sign In</Nav.Link>
                                                <Nav.Link href="/SignUp">Sign Up</Nav.Link>


                                            </Nav>
                                        </>)
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default NavBar