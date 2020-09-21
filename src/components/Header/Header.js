import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";

export default class Header extends Component {
	render() {
		return (
			<header>
				<Navigation setSideBarVisible={this.props.setSideBarVisible}  setVisible={this.props.setVisible} currentPoll={this.props.currentPoll} title={this.props.title} />
			</header>
		);
	}
}
