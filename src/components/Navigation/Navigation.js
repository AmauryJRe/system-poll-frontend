/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
