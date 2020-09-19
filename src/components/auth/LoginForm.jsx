import React, { Component, useState } from "react";
import { Button, Form, FormControl, Card } from "react-bootstrap";
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
    <div className="container col-md-4 " style={{marginTop:'5rem'}}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
		</div>
	);
}

export default RegistrationForm;
