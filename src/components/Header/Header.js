import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";

export default class Header extends Component {
	render() {
		return (
			<header>
				<Navigation
					title={this.props.title}
					auth={this.props.auth}
					setAuthState={this.props.setAuthState}
					setSideBarVisible={this.props.setSideBarVisible}
					setVisible={this.setVisible}
					currentPoll={this.props.currentPoll}
					makeVote={this.makeVote}
					pollsUserCantVote={this.props.pollsUserCantVote}
				/>
			</header>
		);
	}
}
