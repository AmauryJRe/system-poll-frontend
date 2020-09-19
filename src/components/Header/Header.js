import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";

export default class Header extends Component {
	render() {
		return (
			<header>
				<Navigation title={this.props.title} />
			</header>
		);
	}
}
