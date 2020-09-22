/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default class Navigation extends Component {
	render() {
		return (
			<Navbar bg="light" variant="light" expand="lg" sticky="top">
				<Sidebar
					setSideBarVisible={this.props.setSideBarVisible}
					setVisible={this.props.setVisible}
					currentPoll={this.props.currentPoll}
					pollsUserCantVote={this.props.pollsUserCantVote}
					makeVote={this.props.makeVote}
				/>
				<Navbar.Brand href="/">Poll System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to={"/"}>
							Home
						</Nav.Link>
						{localStorage.getItem("polls.isLoggedIn") && localStorage.getItem("polls.role") !== "user" && (
							<Nav.Link as={Link} to={"/users"}>
								Users
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
				{!localStorage.getItem("polls.isLoggedIn") && (
						<Nav.Link className="mr-2 btn btn-sm btn-outline-success" as={Link} to={"/register"}>
							Register
						</Nav.Link>
					) && (
						<Nav.Link className="mr-2 btn btn-sm btn-outline-success" as={Link} to={"/login"}>
							Login
						</Nav.Link>
					)}
			</Navbar>
		);
	}
}
