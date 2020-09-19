import React, { Component, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
const axios = require('axios');

function RegistrationForm() {
	let pollName = React.createRef();

	const [options, setOptions] = useState([{ name: "" }]);

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

		axios.post("http://localhost:5000/poll", {
			name: pollName.current.value,
			options: JSON.stringify(optionsFinal)
		}).then(response=>{
			console.log(response)
		}).catch(err=>{
			console.log(err)
		});
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
		<div class="container">
			<Form>
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="username" placeholder="username" />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" placeholder="username" />
				</Form.Group>
				<Form.Group controlId="formPlaintextPassword">
					<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group>
            <Form.File
              className="position-relative"
              required
              name="file"
              label="File"
              // onChange={handleChange}
              // isInvalid={!!errors.file}
              // feedback={errors.file}
              id="validationFormik107"
              feedbackTooltip
            />
          </Form.Group>
			
			</Form>
		</div>
	);
}

export default RegistrationForm;
