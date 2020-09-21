import React, { Component, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
const axios = require('axios');

function RegistrationForm() {
	const [options, setOptions] = useState();

	const sendDataToApi = (e) => {
		e.preventDefault();
		console.log('Submit register form');
		// let optionsFiltered = options.filter((option) => {
		// 	return option.name !== "";
		// });

		// let optionsFinal = {};

		// optionsFiltered.forEach((element) => {
		// 	optionsFinal[element.name] = 0;
		// });

		// console.log({
		// 	name: pollName.current.value,
		// 	options: JSON.stringify(optionsFinal),
		// });

		// axios.post("http://localhost:5000/user/register", {
		// 	name: pollName.current.value,
		// 	options: JSON.stringify(optionsFinal)
		// }).then(response=>{
		// 	console.log(response)
		// }).catch(err=>{
		// 	console.log(err)
		// });
	};

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		console.log('Input:',name+'=', value)

    };

	return (
		<div className="container col-md-6">
			<Form onSubmit={(e) => sendDataToApi(e)}>
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" name="fullName" placeholder="Full Name" onChange={(e) => handleInputChange(e)} />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" name="username" placeholder="username" onChange={(e) => handleInputChange(e)}/>
				</Form.Group>
				<Form.Group controlId="formPlaintextPassword">
					<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Password" onChange={(e) => handleInputChange(e)}/>
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
						onChange={(e) => handleInputChange(e)}
            />
          </Form.Group>
				 <Button variant="outline-success" type="submit">
          Submit
        </Button>
			</Form>
		</div>
	);
}

export default RegistrationForm;
