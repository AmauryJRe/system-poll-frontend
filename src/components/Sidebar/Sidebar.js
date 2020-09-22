import { render } from "@testing-library/react";
import Axios from "axios";
import React, { Component } from "react";
import { Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import SideNav, { MenuIcon } from "react-simple-sidenav";

export default class Sidebar extends Component {
	// const [state, setState] = useState(props.setSideBarVisible);
	state = {
		showNav: false,
		selectedOption: "",
		error: false,
	};

	onValueChange = (event) => {
		this.setState({
			selectedOption: event.target.value,
		});
	};

	setShowNav = (flag) => {
		this.setState({
			showNav: flag,
		});
	};

	onSubmit = (e) => {
		if (this.state.selectedOption) {
			const poll_id = this.props.currentPoll._id;
			const user_id = 10;
			const item_voted = this.state.selectedOption;
			this.props.makeVote(e,user_id,poll_id,item_voted);
			this.props.setVisible();
		}
	};

	render() {
		const { options } = this.props.currentPoll;
		let opts = Object.assign({}, options);
		let keys = [];
		Object.keys(opts).forEach((key) => {
			keys.push(key);
		});

		return (
			<div>
				<MenuIcon onClick={() => this.setShowNav(true)} />{" "}
				<SideNav
					openFromRight={true}
					showNav={this.props.setSideBarVisible}
					onHideNav={() => {
						this.props.setVisible(false);
						this.setState({ selectedOption: null });
					}}
					title="Hello World"
				>
					<Card>
						<Card.Header as="h5">Poll</Card.Header>
						<Card.Body>
							<Card.Title as="h5">{this.props.currentPoll.name}</Card.Title>

							<Form className="py-2 my-2 ml-2" onSubmit={(e) => this.onSubmit(e)}>
								<fieldset>
									<Form.Group as={Row}>
										<Col sm={10}>
											{keys.map((key) => (
												<Form.Group as={Row}>
													<Form.Check
														type="radio"
														id={`${key}`}
														checked={this.state.selectedOption === key}
														onChange={this.onValueChange}
														value={key}
														name="formRadios"
														label={`${key}`}
														className="mr-2"
														custom
													/>
													<Badge variant="primary">{opts[key]}</Badge>
												</Form.Group>
											))}
										</Col>
									</Form.Group>
								</fieldset>
								<Button type="submit" disabled={this.props.pollsUserCantVote.includes(this.props.currentPoll._id)?true:false} variant="outline-success">
									Vote
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</SideNav>
			</div>
		);
	}
}
