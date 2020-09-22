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
	const { setAuthState } = props

	const sendDataToApi = (e) => {
		e.preventDefault();

		axios.post("http://localhost:5000/user/register", formData).then(response=>{
			const { token } = response.data;
			const { username, role } = response.data.user;
			let authObject = {}
			authObject.token = token;
			authObject.isLoggedIn = true;
			authObject.username = username;
			authObject.role = role;
			setAuthState(authObject)
			setShow(true)
		}).catch(err=>{
			const { error } = err.response && err.response ? err.response.data:err.message;
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
		
	}

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
					{show &&(
					<SweetAlert success title={formData.username}	timeout={1700} onConfirm={()=>onConfirm()}>
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
