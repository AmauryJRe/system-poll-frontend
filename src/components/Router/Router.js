import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import PollForm from "../Polls/Poll/PollForm";
import RegistrationForm from '../auth/RegistrationForm';
import LoginForm from '../auth/LoginForm';
import Polls from "../Polls/Polls";

export default class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Header title="Polls Page" />
				<div className="container pt-3">
					<Switch>
						<Route exact path="/" render={() => <Polls polls={this.props.polls} />} />
						<Route exact path="/addpoll" render={() => <PollForm />} />
<Route exact path="/editpoll" component={PollForm} />
						<Route exact path="/register" render={() => <RegistrationForm />} />
						<Route exact path="/login" render={() => <LoginForm />} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
