import React, { Component } from "react";
import Router from "./components/Router/Router";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = this.getAuthFromLocaStorage()
		this.setAuthState = (authState) => {
			this.setLocalSotorageAuth(authState)
			let nextAuthState = this.getAuthFromLocaStorage()
			this.setState(nextAuthState);
		}
	}

	getAuthFromLocaStorage = () => { 
		let auth = {}
		let starageKey = localStorage.getItem('polls.isLoggedIn')
		// Validating the always true values on booleans in localstorage
		auth.isLoggedIn = starageKey === null ? false:JSON.parse(starageKey);
		auth.token = localStorage.getItem('polls.token')
		auth.username = localStorage.getItem('polls.username')
		auth.role = localStorage.getItem('polls.role')
		return auth
	}

	setLocalSotorageAuth = (authState) => { 
		if (authState === null) {
				localStorage.setItem('polls.token','');
				localStorage.setItem('polls.isLoggedIn',false);
				localStorage.setItem('polls.username','');
				localStorage.setItem('polls.role','');
				
			}
			else {
				localStorage.setItem('polls.token',authState.token);
				localStorage.setItem('polls.isLoggedIn',authState.isLoggedIn);
				localStorage.setItem('polls.username',authState.username);
				localStorage.setItem('polls.role',authState.role||'');
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
