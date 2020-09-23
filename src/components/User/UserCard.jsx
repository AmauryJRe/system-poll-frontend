import React, { Component } from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class UserCard extends Component {
	render() {
		const userData = this.props.location.state.user;
		console.log(userData);
		return (
			<Card>
				<Image
					variant="top"
					src={`data:${userData.avatar.contentType};base64,${"base64String"}`}
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
					<Link to={'/'} className="btn btn-md btn-primary">Go Home</Link>
				</Card.Body>
			</Card>
		);
	}
}
