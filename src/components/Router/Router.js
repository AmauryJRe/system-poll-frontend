import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import PollForm from "../Polls/Poll/PollForm";
import RegistrationForm from "../auth/RegistrationForm";
import LoginForm from "../auth/LoginForm";
import Polls from "../Polls/Polls";
import Axios from "axios";

export default class Router extends Component {
	state = {
		polls: [],
		pollsUserCantVote:[],
		auth: this.props.auth,
		setAuthState: this.props.setAuthState,
		setSideBarVisible: false,
		currentPoll: "",
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

	handleDelete = (id) => {
		console.log("delete the poll with id " + id);
		Axios.delete(`http://localhost:5000/poll/${id}`)
			.then((res) => {
				this.handleRequest();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleRequest = () => {
		const urlPolls = `http://localhost:5000/poll`;
		const user_id= 10;
		const urlCantVote = `http://localhost:5000/vote/cantVote/${user_id}`;
		Axios.get(urlCantVote)
			.then((res) => {
				this.setState({pollsUserCantVote:res.data})
			})
			.catch((err) => {
				console.log(err);
			});

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
			Axios.post("http://localhost:5000/poll", {
				name: pollName.current.value,
				options: JSON.stringify(optionsFinal),
			})
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
			Axios.patch(`http://localhost:5000/poll/${pollData._id}`, {
				name: pollName.current.value,
				options: JSON.stringify(optionsFinal),
			})
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
		console.log({ user_id, poll_id, item_voted });
		Axios.post("http://localhost:5000/vote", { user_id: user_id, poll_id: poll_id, item_voted: item_voted })
			.then((res) => {
				this.handleRequest();
			})
			.catch((err) => {
				console.error(err);
			});
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
									handleDelete={this.handleDelete}
									handleRequest={this.handleRequest}
									sendDataToApi={this.sendDataToApi}
									setCurrentPoll={this.setCurrentPoll}
								/>
							)}
						/>
						<Route
							exact
							path="/addpoll"
							render={() => <PollForm handleRequest={this.handleRequest} sendDataToApi={this.sendDataToApi} />}
						/>
						<Route exact path="/editpoll" component={PollForm} />
						<Route exact path="/register" render={() => <RegistrationForm />} />
						<Route
							exact
							path="/login"
							render={() => <LoginForm auth={this.state.auth} setAuthState={this.state.setAuthState} />}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
