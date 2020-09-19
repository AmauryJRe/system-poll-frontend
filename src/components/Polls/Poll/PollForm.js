import React, { Component, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";

function PollForm() {

	const [options, setOptions] = useState([{name:""}]);

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...options];
		list[index][name] = value;
		setOptions(list);
		console.log(list);
	};

	const handleRemoveClick = (index) => {
		const list = [...options];
		list.splice(index, 1);
		setOptions(list);
	};

	const handleAddClick = (event) => {
		setOptions([...options, { name: "" }]);
		event.preventDefault();
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
									<InputGroup className="mb-3">
										<FormControl
											name="optionName"
											placeholder="Add option here"
											defaultValue="asd"
											onChange={(e) => handleInputChange(e, idx)}
										/>
										<InputGroup.Append>
										{ options.length !== 1 &&
											<button variant="outline-secondary" onClick={handleRemoveClick}>
												Remove
											</button>
										}

{ options.length -1 === idx &&
											<button variant="outline-secondary" onClick={(e) => handleAddClick(e)}>
												Add
											</button>
										}
										</InputGroup.Append>
									</InputGroup>
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

export default PollForm;