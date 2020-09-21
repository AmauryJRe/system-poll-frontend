/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
	render() {
		return (
			<Navbar bg="light" variant="light" expand="lg" sticky="top">
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to ={'/'}>Home</Nav.Link>
						<Nav.Link as={Link} to ={'/addpoll'}>AddPoll</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item as={Link} to={'/'}>Action</NavDropdown.Item>
							<NavDropdown.Item as={Link} to ={'/addpoll'}>Another action</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={'/'}>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to ={'/addpoll'}>Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				<Nav.Link className='mr-2 btn btn-sm btn-outline-success' as={Link} to={'/register'}>Register</Nav.Link>
				<Nav.Link className = 'mr-2 btn btn-sm btn-outline-success' as={Link} to ={'/login'}>Login</Nav.Link>
			</Navbar>
		);
	}
}
