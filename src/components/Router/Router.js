import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import RegistrationForm from "../auth/RegistrationForm";
import LoginForm from "../auth/LoginForm";
import EditUserForm from "../User/EditUserForm";
import Users from "../User/Users";
import Polls from "../Polls/Polls";
import PollForm from "../Polls/Poll/PollForm";
import Axios from "axios";
import PollCard from "../Polls/Poll/PollCard";
import UserCard from "../User/UserCard";

export default class Router extends Component {
	state = {
		polls: [],
		users: [],
		editUser: [],
		pollsUserCantVote: [],
		setSideBarVisible: false,
		currentPoll: "",
	};

	setEditUser = (user) => {
		this.setState({
			editUser: user,
		});
		console.log(user);
	};

	setVisible = () => {
		this.setState({ setSideBarVisible: !this.state.setSideBarVisible });
	};

	setCurrentPoll = (poll) => {
		this.setState({ currentPoll: poll });
	};

	componentDidMount() {
		this.handleRequest();
	}

	handleDeletePoll = (id) => {
		if (this.props.auth.isLoggedIn) {
			console.log("Delete the poll with id " + id);
			var config = {
				method: "delete",
				url: `http://localhost:5000/poll/${id}`,
				headers: {
					"Content-Type": "application/json",
					"header-auth-token": localStorage.getItem("polls.token"),
				},
			};
			Axios(config)
				.then((res) => {
					this.handleRequest();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	handleDeleteUser = (id) => {
		if (this.props.auth.isLoggedIn) {
			console.log("Delete the user with id " + id);
			var config = {
				method: "delete",
				url: `http://localhost:5000/user/${id}`,
				headers: {
					"Content-Type": "application/json",
					"header-auth-token": localStorage.getItem("polls.token"),
				},
			};
			Axios(config)
				.then((res) => {
					this.handleRequest();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	handleRequest = () => {
		if (this.props.auth.isLoggedIn) {
			const user_id = localStorage.getItem("polls.user_id");
			var config = {
				method: "get",
				url: `http://localhost:5000/vote/cantVote/${user_id}`,
				headers: {
					"Content-Type": "application/json",
					"header-auth-token": localStorage.getItem("polls.token"),
				},
			};
			Axios(config)
				.then((res) => {
					this.setState({ pollsUserCantVote: res.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}

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

		fetch("http://localhost:5000/userprofile")
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({
					users: res,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	sendDataToApi = (e, options, pollName, requestType, pollData) => {
		e.preventDefault();

		let optionsFiltered = options.filter((option) => {
			return option.name !== "";
		});

		let optionsFinal = {};

		optionsFiltered.forEach((element) => {
			optionsFinal[element.name] = 0;
		});

		console.log({
			name: pollName.current.value,
			options: JSON.stringify(optionsFinal),
		});

		if (requestType === "post") {
			var config = {
				method: "post",
				url: `http://localhost:5000/poll`,
				headers: {
					"Content-Type": "application/json",
					"header-auth-token": localStorage.getItem("polls.token"),
				},
				data: {
					name: pollName.current.value,
					options: JSON.stringify(optionsFinal),
				},
			};
			Axios(config)
				.then((response) => {
					console.log("On Add Poll");
					console.log(response);
					this.handleRequest();
					console.log("On Add Poll");
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (requestType === "patch") {
			var config = {
				method: "patch",
				url: `http://localhost:5000/poll/${pollData._id}`,
				headers: {
					"Content-Type": "application/json",
					"header-auth-token": localStorage.getItem("polls.token"),
				},
				data: {
					name: pollName.current.value,
					options: JSON.stringify(optionsFinal),
				},
			};
			Axios(config)
				.then((response) => {
					console.log("On Edit Poll");
					console.log(response);
					this.handleRequest();
					console.log("On Edit Poll");
				})
				.catch((err) => {
					console.log("On Edit Poll");
					console.log(err);
				});
		}
	};

	makeVote = (e, user_id, poll_id, item_voted) => {
		e.preventDefault();
		if (this.props.auth.isLoggedIn) {
			var config = {
				method: "post",
				url: `http://localhost:5000/vote`,
				headers: {
					"Content-Type": "application/json",
					"header-auth-token": localStorage.getItem("polls.token"),
				},
				data: { user_id: user_id, poll_id: poll_id, item_voted: item_voted },
			};
			Axios(config)
				.then((res) => {
					this.handleRequest();
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	render() {
		return (
			<BrowserRouter>
				<Header
					setSideBarVisible={this.state.setSideBarVisible}
					setVisible={this.setVisible}
					currentPoll={this.state.currentPoll}
					makeVote={this.makeVote}
					pollsUserCantVote={this.state.pollsUserCantVote}
					title="Polls Page"
					auth={this.props.auth}
					setAuthState={this.props.setAuthState}
				/>
				<div className="container pt-3">
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Polls
									polls={this.state.polls}
									setVisible={this.setVisible}
									handleDeletePoll={this.handleDeletePoll}
									handleRequest={this.handleRequest}
									sendDataToApi={this.sendDataToApi}
									setCurrentPoll={this.setCurrentPoll}
									auth={this.props.auth}
								/>
							)}
						/>
						<Route exact path="/poll" component={PollCard} />
						<Route exact path="/user" component={UserCard} />
						<Route
							exact
							path="/addpoll"
							render={() => <PollForm handleRequest={this.handleRequest} sendDataToApi={this.sendDataToApi} />}
						/>
						<Route exact path="/editpoll" component={PollForm} />
						<Route exact path="/edituser" component={EditUserForm} />
						<Route
							exact
							path="/users"
							render={() => (
								<Users
									users={this.state.users}
									auth={this.props.auth}
									setEditUser={this.setEditUser}
									// setVisible={this.setVisible}
									// handleDelete={this.handleDelete}
									handleRequest={this.handleRequest}
									sendUserDataToApi={this.sendUserDataToApi}
									// setCurrentPoll={this.setCurrentPoll}
								/>
							)}
						/>
						<Route exact path="/register" render={() => <RegistrationForm setAuthState={this.props.setAuthState} />} />
						<Route
							exact
							path="/login"
							render={() => <LoginForm auth={this.props.auth} setAuthState={this.props.setAuthState} />}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
