import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import PollForm from "../Polls/Poll/PollForm";
import Polls from "../Polls/Polls";

export default class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Header title="Polls Page" />
				<div className="container py-1">
					<Switch>
						<Route exact path="/" render={() => <Polls polls={this.props.polls} />} />
						<Route exact path="/addpoll" render={() => <PollForm />} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
