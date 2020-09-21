import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
const axios = require("axios");

export default function PollForm(props) {
	
	let pollData = (props.location && props.location.state.pollToEdit) || false;
	let keysObject = [];
	let requestType = 'post';
	if (pollData) {
		const opts = pollData.options;
		Object.keys(opts).forEach((key) => {
			keysObject.push({ name: key });
		});
		requestType='patch';
	} else {
		console.log("No data");
	}

	keysObject.push({name:""})
	const [options, setOptions] = useState(keysObject);
	
	const history = useHistory();
	let pollName = React.createRef();

	const sendDataToApi = (e) => {
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
			axios
			.post("http://localhost:5000/poll", {
				name: pollName.current.value,
				options: JSON.stringify(optionsFinal),
			})
			.then((response) => {
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
		}else if(requestType==='patch'){
			axios
			.patch(`http://localhost:5000/poll/${pollData._id}`, {
				name: pollName.current.value,
				options: JSON.stringify(optionsFinal),
			})
			.then((response) => {
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
		}

		history.push('/');
	};

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...options];
		list[index][name] = value;
		setOptions(list);
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
		<div className="container">
			<Card border="success">
				<Card.Header as="h5" className="text-center">
					Create a new Poll
				</Card.Header>
				<Card.Body>
					{/* <Card.Title>Special title treatment</Card.Title> */}
					<Form onSubmit={(e) => sendDataToApi(e)}>
						<Form.Group controlId="formGroupName">
							<Form.Label>Poll Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter The poll name"
								defaultValue={pollData ? pollData.name : null}
								ref={pollName}
							/>
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
												<Button variant="outline-secondary" onClick={() => handleRemoveClick(idx)}>
													Remove
												</Button>
											)}

											{options.length - 1 === idx && (
												<Button variant="outline-secondary" onClick={(e) => handleAddClick(e)}>
													Add
												</Button>
											)}
										</InputGroup.Append>
									</InputGroup>
								);
							})}
						</Form.Group>

						<Button type="submit" variant="success">
							Save
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
