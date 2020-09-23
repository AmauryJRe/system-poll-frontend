/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import User from "./User.jsx";
export default class Users extends Component {
	render() {
		const userList = this.props.users;
		const { isLoggedIn } = this.props.auth;
		return (
			<TransitionGroup>
				{isLoggedIn ? (
					<Link className="btn btn-lg btn-outline-success mb-2" to={"/adduser"}>
						Add
					</Link>
				) : (
					<b></b>
				)}
				{userList.map((user) => (
					<CSSTransition key={user._id} className="fade" timeout={100}>
						<User
							setEditUser={this.props.setEditUser}
							data={user}
							setVisible={this.props.setVisible}
							// setCurrentPoll={this.props.setCurrentPoll}
							// handleDelete={this.props.handleDelete}
							handleRequest={this.props.handleRequest}
							sendUserDataToApi={this.props.sendUserDataToApi}
							auth={this.props.auth}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	}
}
