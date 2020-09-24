import Axios from "axios";
import React, { Component } from "react";
import { Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../App.css'
import { FaUserCircle } from "react-icons/fa";
import { SiDassaultsystemes } from "react-icons/si";
import { GoHome } from "react-icons/go";

export default class UserCard extends Component {

	state={
		user:{},
		base64String:{}
	}
componentDidMount(){
	this.requestUserData();
}
	requestUserData = () => {
		const userData = this.props.location.state.user;
		
		let config = {
			method: "get",
			url: `http://localhost:5000/userprofile/${userData._id}`,
			headers: {
				"Content-Type": "application/json",
				"header-auth-token": localStorage.getItem("polls.token"),
			},
		};
		Axios(config)
		.then((res) => {
			console.log(res);
			this.setState({ user: res.data });
			let TYPED_ARRAY = new Uint8Array(res.data.fullSizeAvatar.data.data);
			const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
				return data + String.fromCharCode(byte);
			}, "");
			let base64String = btoa(STRING_CHAR);
			this.setState({base64String})
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const userData = this.props.location.state.user;
		const base64String = this.state.base64String
		return (
			<Card className="UserCard">
				<Card.Img style={{maxWidth:280}} className="rounded-circle" 
					variant="top"
					src={`data:${userData.avatar.contentType};base64,${base64String}`}
				/>

				<Card.Body>
					<Card.Title style={{ textAlign: 'center' }} >{userData.fullName}</Card.Title>
					
					<Card.Subtitle style={{ textAlign: 'center'}}>
					<FaUserCircle/>	{userData.username}
					</Card.Subtitle>
					<ListGroup variant="flush">
						<ListGroup.Item style={{textAlign:'left'}}>Access Level: {userData.role}</ListGroup.Item>
						<ListGroup.Item><SiDassaultsystemes style={{fontSize:20}}/> Poll System App	</ListGroup.Item>
					</ListGroup>
					<Link to={"/"} style={{fontSize:20}}className="btn btn-md btn-primary btn-block">
						<GoHome/>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}
