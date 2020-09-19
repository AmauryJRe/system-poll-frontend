import React, { Component } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";

export default class PollForm extends Component {
	state = {
		options: [{ name: "" }],
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

			console.log(list);
		};

		const handleRemoveClick = (index) => {
			const list = [...options];
			list.splice(index, 1);
			this.setState({
				options: list,
			});
		};

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
								<Form.Control type="text" placeholder="Enter The poll name" defaultValue="asdads" />
							</Form.Group>
							<Form.Group controlId="formGroupOptions">
								<Form.Label>AddOption</Form.Label>
								{options.map((opt, idx) => {
									return (
										<FormControl
											name="optionName"
											placeholder="Add option here"
											defaultValue="asd"
											onChange={(e) => handleInputChange(e, idx)}
										/>
									);
								})}
							</Form.Group>

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
