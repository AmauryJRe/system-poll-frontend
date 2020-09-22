/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Poll from "./Poll/Poll";
export default class Polls extends Component {
	render() {
		const pollList = this.props.polls;
		const {isLoggedIn} = this.props.auth;
		return (
			<TransitionGroup>
				{isLoggedIn &&
				<Link className="btn btn-lg btn-outline-success mb-2" to={"/addpoll"}>
					Add New Poll
				</Link>
	}
				{pollList.map((poll) => (
					<CSSTransition key={poll._id} className="fade" timeout={100}>
						<Poll
							data={poll}
							setVisible={this.props.setVisible}
							setCurrentPoll={this.props.setCurrentPoll}
							handleDelete={this.props.handleDelete}
							handleRequest={this.props.handleRequest}
							sendDataToApi={this.props.sendDataToApi}
							auth={this.props.auth}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	}
}
