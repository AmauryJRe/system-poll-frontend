import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";

export default function PollForm(props) {
	console.log(props.location);
	
	let pollName = React.createRef();
	let pollData = (props.location && props.location.state.pollToEdit) || false;
	let keysObject = [];
	let requestType = "post";
	if (pollData) {
		const opts = pollData.options;
		Object.keys(opts).forEach((key) => {
			keysObject.push({ name: key });
		});
		requestType = "patch";
	} else {
		console.log("No data");
	}
	
	keysObject.push({ name: "" });

	const [options, setOptions] = useState(keysObject);

	const history = useHistory();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if(requestType==='patch'){
			console.log(props.location);
			props.location.sendDataToApi(e, options, pollName, requestType, pollData);
		}else{
			props.sendDataToApi(e, options, pollName, requestType, pollData);
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
					<Form onSubmit={(e) => handleSubmit(e)}>
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
