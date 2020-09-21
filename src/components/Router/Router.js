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

	sendDataToApi = (e,options,pollName,requestType,pollData) => {
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

		if(requestType==='post'){
			Axios
			.post("http://localhost:5000/poll", {
				name: pollName.current.value,
				options: JSON.stringify(optionsFinal),
			})
			.then((response) => {
				console.log('On Add Poll');
				console.log(response);
				this.handleRequest();
				console.log('On Add Poll');
			})
			.catch((err) => {
				console.log(err);
			});
		}else if(requestType==='patch'){
			Axios
			.patch(`http://localhost:5000/poll/${pollData._id}`, {
				name: pollName.current.value,
				options: JSON.stringify(optionsFinal),
			})
			.then((response) => {
				console.log('On Edit Poll');
				console.log(response);
				this.handleRequest();
				console.log('On Edit Poll');
			})
			.catch((err) => {
				console.log('On Edit Poll');
				console.log(err);
			});
		}
	};

	render() {
		return (
			<BrowserRouter>
				<Header title="Polls Page" />
				<div className="container pt-3">
					<Switch>
						<Route exact path="/" render={() => <Polls polls={this.state.polls} handleDelete={this.handleDelete} handleRequest={this.handleRequest} sendDataToApi={this.sendDataToApi}/>} />
						<Route exact path="/addpoll" render={() => <PollForm  handleRequest={this.handleRequest} sendDataToApi={this.sendDataToApi} />} />
						<Route exact path="/editpoll" component={PollForm} />
						<Route exact path="/register" render={() => <RegistrationForm />} />
						<Route exact path="/login" render={() => <LoginForm />} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
