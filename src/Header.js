import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link" id="link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link" id="link">About us</Link></NavItem>
        {/* <NavItem><Link to="/" className="nav-link" id="link"></Link></NavItem> */}
        {/* PLACEHOLDER: render a navigation link to the about page */}
      </Navbar>
    );
  }
}

export default Header;
