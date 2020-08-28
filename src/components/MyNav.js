import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer,
MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
// import * as mdb from 'mdb-ui-kit'; // lib
// import { Input } from 'mdb-ui-kit'; // module


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



// import React, { Component } from 'react';
// import './MyNav.css';
// (import { fallDown as Menu } from 'react-burger-menu'

// class MyNav extends React.Component {
//   showSettings (event) {
//     event.preventDefault();
    
//   }

//   render () {
//     // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
//     return (
//       <Menu>
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/SignUp">SignUp</a>
//         <a id="contact" className="menu-item" href="/SignIn">SignIn</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//       </Menu>
//     );
//   }
// }



// export default MyNav;)