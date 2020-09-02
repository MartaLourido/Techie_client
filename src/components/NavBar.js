import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

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
                                            <NavDropdown.Item href="/user">My Profile</NavDropdown.Item>
                                            <NavDropdown.Divider />

                                        </NavDropdown>
                                        <Nav>
                                            <Nav.Link href="/feed">Feed</Nav.Link>
                                            <Nav.Link href="/events">Events</Nav.Link>
                                          
                                        </Nav>

                                        <button onClick={this.props.onLogout}>Logout</button>
                                    </>
                                ) : (
                                        <>
                                            <Nav>
                                                <Nav.Link href="/signin">Sign In</Nav.Link>
                                                <Nav.Link href="/signup">Sign Up</Nav.Link>


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