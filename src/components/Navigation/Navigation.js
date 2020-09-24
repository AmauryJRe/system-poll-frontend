/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Fragment,useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoHome } from "react-icons/go";
import { SiDassaultsystemes } from "react-icons/si";
import { AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa"

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
			<Navbar.Brand href="/"><SiDassaultsystemes/> Polls App</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to={'/'}><GoHome style={{fontSize:20}}/> Home</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Nav.Link className='mr-2 btn btn-sm btn-outline-success' as={Link} to={'/register'}>
				<FaWpforms style={{fontSize:20}}/> Register</Nav.Link>
			<Nav.Link className='mr-2 btn btn-sm btn-outline-success' as={Link} to={'/login'}>
				<AiOutlineLogin style={{fontSize:20}}/>Login</Nav.Link>
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
				<Navbar.Brand href="/"> <SiDassaultsystemes/> Poll System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to={"/"}>
							<GoHome style={{fontSize:20}}/> Home
						</Nav.Link>
						<Nav.Link as={Link} to={'/users'}><AiOutlineUser style={{fontSize:20}}/> Users</Nav.Link>
						</Nav>
				</Navbar.Collapse>
				<Nav.Link
					className='mr-2 btn btn-sm btn-outline-success'
					onClick={handleClickLogOut}>
					Logout <AiOutlineLogout style={{fontSize:20}}/>
					</Nav.Link>
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