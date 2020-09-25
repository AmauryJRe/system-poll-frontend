import Axios from "axios";
import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "./components/Router/Router";
const jwt = require("jsonwebtoken");

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.getAuthFromToken(), show: false };
		this.setAuthState = (authState) => {
			this.setLocalSotorageAuth(authState);
			this.setState(authState);
		};
	}

	getAuthFromToken = () => {
		const payload = jwt.decode(localStorage.getItem("polls.token"));
		let starageKey = localStorage.getItem("polls.isLoggedIn");
		const isLoggedIn = starageKey === null ? false : JSON.parse(starageKey);

		return { ...payload, isLoggedIn: isLoggedIn };
	};

	getAuthFromLocaStorage = () => {
		let auth = {};
		let starageKey = localStorage.getItem("polls.isLoggedIn");
		// Validating the always true values on booleans in localstorage
		auth.isLoggedIn = starageKey === null ? false : JSON.parse(starageKey);
		auth.token = localStorage.getItem("polls.token");
		auth.username = localStorage.getItem("polls.username");
		auth.role = localStorage.getItem("polls.role");
		auth.user_id = localStorage.getItem("polls.user_id");
		return auth;
	};

	setLocalSotorageAuth = (authState) => {
		if (authState === null) {
			localStorage.setItem("polls.token", "");
			localStorage.setItem("polls.isLoggedIn", false);
			localStorage.setItem("polls.username", "");
			localStorage.setItem("polls.role", "");
			localStorage.setItem("polls.user_id", "");
		} else {
			localStorage.setItem("polls.token", authState.token);
			localStorage.setItem("polls.isLoggedIn", authState.isLoggedIn);
			localStorage.setItem("polls.username", authState.username);
			localStorage.setItem("polls.role", authState.role || "");
			localStorage.setItem("polls.user_id", authState.user_id || "");
		}
	};

	componentDidMount() {
		console.log('Checking token');
		if(localStorage.getItem("polls.token")){
			this.checkToken();
		}
	}

	checkToken = () => {
		console.log('Checking token');
		const config = {
			method: "post",
			url: `http://localhost:5000/checktoken`,
			headers: {
				"Content-Type": "application/json",
				"header-auth-token": localStorage.getItem("polls.token"),
			},
		};
		Axios(config)
			.then(() => {
				console.log("Token valid");
			})
			.catch(() => {
				localStorage.clear();
				let starageKey = localStorage.getItem("polls.isLoggedIn");
				const isLoggedIn = starageKey === null ? false : JSON.parse(starageKey);
				this.setState({isLoggedIn:isLoggedIn, show: true });
				// SET state checkToken error and show aler and redirect to login
			});
	};
	onConfirm = () =>{
		this.setState({show:false})
	}

	render() {
		return (
			<React.Fragment>
				{this.state.show && (
					<SweetAlert error title="Token Invalid" timeout={1700} onConfirm={()=>this.onConfirm()}>
						Do not mess with te token!! Please!!
					</SweetAlert>
				)}
				<Router auth={this.state} setAuthState={this.setAuthState} />
			</React.Fragment>
		);
	}
}
