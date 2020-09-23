import Axios from "axios";
import React, { Component } from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

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
			<Card>
				<Image
					variant="top"
					src={`data:${userData.avatar.contentType};base64,${base64String}`}
					width="150"
					height="150"
					roundedCircle
				/>

				<Card.Body>
					<Card.Title>{userData.fullName}</Card.Title>
					<ListGroup variant="flush">
						<ListGroup.Item>Username: {userData.username}</ListGroup.Item>
						<ListGroup.Item>Role: {userData.role}</ListGroup.Item>
					</ListGroup>
					<Link to={"/"} className="btn btn-md btn-primary">
						Go Home
					</Link>
				</Card.Body>
			</Card>
		);
	}
}
