import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function RegistrationForm(props) {
	const [formData, setOptions] = useState({});
	const [show, setShow] = useState(false);
	const [errors, setErrors] = useState('')
	const [showError,setShowError] = useState(false)
	let history = useHistory();
	const {auth,setAuthState} = props
	const sendDataToApi = (e) => {
		e.preventDefault();
		
		axios.post("http://localhost:5000/user/login", formData).then(response => {
			const { token } = response.data;
			const { username, role } = response.data.user;
			// auth.token = token;
			// auth.username = username;
			// auth.role = role;
			// auth.isLoggedIn = true;
			console.log(token, username, role)
			console.log(auth)
			let authObject = {}
			authObject.token = token;
			auth.isLoggedIn = true;
			auth.username = username;
			auth.role = role;
			setAuthState(authObject)
			setShow(true)
		}).catch(err => {
			console.log(err)
			const { error } = err.response.data
			setShowError(true)
			setErrors(error)
		});
	};

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		formData.[name] = value;
		setOptions(formData);
	};

	const onConfirm = () => { 
		setShow(false)
		history.push("/");
	}
	const onConfirmError = ()=>{ 
		setShowError(false)
		
		// TODO mark the field
	}

	return (
    <div className="container col-md-4 " style={{marginTop:'5rem'}}>
      <Form onSubmit={(e) => sendDataToApi(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" name="username" placeholder="Enter email" onChange={(e) => handleInputChange(e)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={(e) => handleInputChange(e)} />
        </Form.Group>
        <Button variant="primary" type="submit">
					Submit
        </Button>
				{show &&(
					<SweetAlert success title={formData.username}	timeout={3500} onConfirm={()=>onConfirm()}>
							You are logged in successfully
					</SweetAlert>
				)}
				{showError &&(
					<SweetAlert error title='Error'	timeout={3500} onConfirm={()=>onConfirmError()}>
						{errors}
					</SweetAlert>
				)}
      </Form>
		</div>
	);
}

export default RegistrationForm;
