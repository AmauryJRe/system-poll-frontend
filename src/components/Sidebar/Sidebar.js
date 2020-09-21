import { render } from "@testing-library/react";
import React, { Component, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SideNav, { MenuIcon } from "react-simple-sidenav";

export default class Sidebar extends Component {
	// const [state, setState] = useState(props.setSideBarVisible);
	state = {
		showNav: false,
	};
	setShowNav = (flag) => {
		this.setState({
			showNav: flag,
		});
	};

	render() {
		const { options } = this.props.currentPoll;
		let copy = Object.assign({}, options);
		let keys = [];
		Object.keys(copy).forEach((key) => {
			keys.push(key);
		});
		return (
			<div>
				<MenuIcon onClick={() => this.setShowNav(true)} />{" "}
				<SideNav
					openFromRight={true}
					showNav={this.props.setSideBarVisible}
					onHideNav={() => this.props.setVisible(false)}
					title="Hello World"
					items={[
						<Form>
							<fieldset>
								<Form.Group as={Row}>
									<Col sm={10}>
										{keys.map((key) => (
											<Form.Check type="radio" id={`${key}`} name='formRadios' label={`default ${key}`} />
										))}
									</Col>
								</Form.Group>
							</fieldset>
							<Button>Vote</Button>
						</Form>,
					]}
				/>
			</div>
		);
	}
}
