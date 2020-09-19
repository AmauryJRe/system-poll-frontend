import React, { Component } from "react";
import { Button, Card, Form, FormControl, InputGroup, ListGroup } from "react-bootstrap";

export default class PollForm extends Component {
	state = {
		options: [{ name: "" }],
	};

	handleChange = () => {};

	handleAdd = (event) => {
		this.setState = {
			options: [...this.state.options, { name: event.target.value }],
		};
		event.preventDefault();
		console.log(this.state.options);
	};

	render() {
		let { options } = this.state;

		const handleInputChange = (e, index) => {
			const { name, value } = e.target;
			const list = [...options];
			list[index][name] = value;
			this.setState({
				options: list,
			});
		};

		// handle click event of the Remove button
		const handleRemoveClick = (index) => {
			const list = [...options];
			list.splice(index, 1);
			this.setState({
				options: list,
			});
		};

		// handle click event of the Add button
		const handleAddClick = () => {
			this.setState({
				options: { name: "" },
			});
		};
		return (
			<div class="container">
				<Card border="success">
					<Card.Header as="h5" className="text-center">
						Featured
					</Card.Header>
					<Card.Body>
						<Card.Title>Special title treatment</Card.Title>

						<Form>
							<Form.Group controlId="formGroupName">
								<Form.Label>Poll Name</Form.Label>
								<Form.Control type="text" placeholder="Enter The poll name" />
							</Form.Group>
							<Form.Group controlId="formGroupOptions">
								<Form.Label>Options</Form.Label>
							</Form.Group>

							{options.map((opt, idx) => {
								return (
									<div className="box">
										<FormControl
											name="firstName"
											placeholder="Enter First Name"
											value={opt.name}
											onChange={(e) => handleInputChange(e, idx)}
										/>
										<div className="btn-box">
											{options.length !== 1 && (
												<button className="mr10" onClick={() => handleRemoveClick(idx)}>
													Remove
												</button>
											)}
											{options.length - 1 === idx && <button onClick={handleAddClick}>Add</button>}
										</div>
									</div>
								);
							})}

							<Button type="submit" variant="primary">
								Go somewhere
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
