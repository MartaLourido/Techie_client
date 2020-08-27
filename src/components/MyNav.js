// import React from 'react'
// import { Nav, Navbar } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// export default function MyNav(props) {
//     return (
//         <div>
//             {/* <Navbar inverse collapseOnSelect>
//                 <Navbar.Header>
//                     <Navbar.Brand>
//                         <a href="#brand">React-Bootstrap</a>
//                     </Navbar.Brand>
//                     <Navbar.Toggle />
//                 </Navbar.Header>
//                 <Navbar.Collapse>
//                     <Nav className="mr-auto">
//                         <Link to="/">Home</Link>
//                     </Nav>
//                     {
//                         props.loggedInUser ? (
//                             <Nav className="mr-auto">
//                                 <button onClick={props.onLogout}>Logout</button>
//                             </Nav>
//                         ) : (
//                                 <>
//                                     <Nav className="mr-auto">
//                                         <Link to="/SignIn">Sign In</Link>
//                                     </Nav>
//                                     <Nav className="mr-auto">
//                                         <Link to="/SignUp">Sign Up</Link>
//                                     </Nav>
//                                 </>
//                             )
//                     }
//                 </Navbar.Collapse>
//             </Navbar> */}
//         </div>
//     )
// }




import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer,
MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class MyNav extends Component {
state = {
  collapseID: ''
}

toggleCollapse = collapseID => () => {
  this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
}

render() {
  return (
      <MDBContainer>
        <MDBNavbar color="green lighten-4" style={{ marginTop: '20px' }} light>
          <MDBContainer>
            <MDBNavbarBrand>
              Techie {/* <img src="logo.png" alt="Logo" width="500" height="600"> */}
            </MDBNavbarBrand>
            <MDBNavbarToggler tag="button" className="aqua-gradient" onClick={this.toggleCollapse('navbarCollapse13')}>
              <span className="white-text">
                <MDBIcon icon="bars" />
              </span>
            </MDBNavbarToggler>
            <MDBCollapse id="navbarCollapse13" isOpen={this.state.collapseID} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="#!">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/SignIn">SignIn</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/SignUp">SignUp</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>

    );
  }
}

export default MyNav;