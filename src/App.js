import React, { Component } from "react";
import Router from "./components/Router/Router";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
					token: localStorage.getItem('polls.token'),
					isLoggedIn: localStorage.getItem('polls.isLoggedIn'),
					username: localStorage.getItem('polls.username'),
					role: localStorage.getItem('polls.role')
		};
		this.setAuthState = (authState)=>{ 
			this.setState(authState);
			localStorage.setItem('polls.token',authState.token);
			localStorage.setItem('polls.isLoggedIn',authState.isLoggedIn);
			localStorage.setItem('polls.username',authState.username);
			localStorage.setItem('polls.role',authState.role);
		}
  }

	render() {
		return (
			<React.Fragment>
				<Router auth={this.state} setAuthState={this.setAuthState}/>
			</React.Fragment>
		);
	}
}
