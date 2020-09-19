import React, { Component, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";

function PollForm() {
	let pollName = React.createRef();
	
	const [options, setOptions] = useState([{ name: "" }]);

	const sendDataToApi = (e) => {
		e.preventDefault();
		let optionsFiltered = options.filter(option=>{
			return option.name !== "";
		})

		let optionsFinal = {};
		
		optionsFiltered.forEach(element => {
			optionsFinal[element.name]=0;
		});
	
		console.log({
			name:pollName.current.value,
			options: JSON.stringify(optionsFinal)
		});
	};


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
					<Form onSubmit={(e) => sendDataToApi(e)}>
						<Form.Group controlId="formGroupName">
							<Form.Label>Poll Name</Form.Label>
							<Form.Control type="text" placeholder="Enter The poll name" ref={pollName} />
						</Form.Group>
						<Form.Group controlId="formGroupOptions">
							<Form.Label>AddOption</Form.Label>
							{options.map((opt, idx) => {
								return (
									<InputGroup className="mb-3">
										<FormControl
											name="name"
											placeholder="Add option here"
											defaultValue={opt.name}
											onChange={(e) => handleInputChange(e, idx)}
										/>
										<InputGroup.Append>
											{options.length !== 1 && options.length - 1 !== idx && (
												<button variant="outline-secondary" onClick={handleRemoveClick}>
													Remove
												</button>
											)}

											{options.length - 1 === idx && (
												<button variant="outline-secondary" onClick={(e) => handleAddClick(e)}>
													Add
												</button>
											)}
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
