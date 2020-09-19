import React, { Component } from "react";
import Header from "./components/Header/Header";
import Router from "./components/Router/Router";

export default class App extends Component {
	state = {
		polls: [],
	};

	componentDidMount() {
		this.handleRequest();
	}
	handleRequest = () => {
		const urlPolls = `http://localhost:5000/poll`;
		fetch(urlPolls)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({
					polls: res,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<React.Fragment>
				<Router polls={this.state.polls} />
			</React.Fragment>
		);
	}
}
