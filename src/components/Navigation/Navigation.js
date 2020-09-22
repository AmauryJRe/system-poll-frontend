/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Fragment,useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';


const Navigation=(props)=> {
	
	const { isLoggedIn } = props.auth;
	const {setAuthState} = props;
	const history = useHistory();
	const [show, setShow] = useState(false);
	const [username, setUsername] = useState()
	const [showError,setShowError] = useState(false)

	const handleClickLogOut = () => {
		setUsername(props.auth.username)
		setAuthState(null)
		setShow(true)
		
	}

	const onConfirm = () => { 
		setShow(false)
		history.push("/");
	}
	const onConfirmError = ()=>{ 
		setShowError(false)
		
	}
	const guestLinks = (
			<Fragment>
			<Navbar.Brand href="#home">Polls App</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to={'/'}>Home</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Nav.Link className='mr-2 btn btn-sm btn-outline-success' as={Link} to={'/register'}>Register</Nav.Link>
				<Nav.Link className='mr-2 btn btn-sm btn-outline-success' as={Link} to={'/login'}>Login</Nav.Link>
			</Fragment>
		);
		const userLinks = (
			<Fragment>
				
				<Sidebar
					setSideBarVisible={props.setSideBarVisible}
					setVisible={props.setVisible}
					currentPoll={props.currentPoll}
					pollsUserCantVote={props.pollsUserCantVote}
					makeVote={props.makeVote}
				/>
				<Navbar.Brand href="/">Poll System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to={"/"}>
							Home
						</Nav.Link>
						<Nav.Link as={Link} to={'/addpoll'}>AddPoll</Nav.Link>
						{localStorage.getItem("polls.isLoggedIn") && localStorage.getItem("polls.role") === "admin" && (
							<Nav.Link as={Link} to={"/users"}>
								Users
							</Nav.Link>
						)}
					
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item as={Link} to={'/'}>Action</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={'/addpoll'}>Another action</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={'/'}>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to={'/addpoll'}>Separated link</NavDropdown.Item>
						</NavDropdown>
						</Nav>
				</Navbar.Collapse>
					<Nav.Link className='mr-2 btn btn-sm btn-outline-success' onClick={handleClickLogOut}>Logout</Nav.Link>
			</Fragment>
		);
		
		return (
			<Navbar bg="light" variant="light" expand="lg" sticky="top">
			{isLoggedIn ? userLinks: guestLinks}
			{show &&(
					<SweetAlert success title={username}	timeout={1700} onConfirm={()=>onConfirm()}>
							You are logged out successfully
					</SweetAlert>
				)}
				{showError &&(
					<SweetAlert error title='Error'	timeout={3500} onConfirm={()=>onConfirmError()}>
						{/* "{errors}" */}
					</SweetAlert>
				)}
			</Navbar>
		);
}
export default Navigation;