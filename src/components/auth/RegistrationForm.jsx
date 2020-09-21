import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

function RegistrationForm() {
	const [formData, setOptions] = useState({});
	const [show, setShow] = useState(false);
	const [errors, setErrors] = useState('')
	const [showError,setShowError] = useState(false)
	let history = useHistory();

	const sendDataToApi = (e) => {
		e.preventDefault();
		console.log('Submit register form');
		console.log(formData)
		axios.post("http://localhost:5000/user/register", formData ).then(response=>{
			console.log(response)
			//TODO Store the user data in the sate variable. Add in the setState function the function to store to the local storage too
			setShow(true)
		}).catch(err => {
			const { error } = err.response.data
			console.log(error)
			setShowError(true)
			console.log(err)
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
		<div className="container col-md-6">
			<Form onSubmit={(e) => sendDataToApi(e)}>
				
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" name="fullName" placeholder="Full Name" onChange={(e) => handleInputChange(e)} />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlInput" >
					<Form.Label>Username</Form.Label>
					<Form.Control isInvalid={!!errors} type="username" name="username" placeholder="username" onChange={(e) => handleInputChange(e)}/>
				<Form.Control.Feedback type="invalid">
                {errors}
        </Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="formPlaintextPassword">
					<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Password" onChange={(e) => handleInputChange(e)}/>
				</Form.Group>
				<Form.Group controlId="formPlaintextPassword">
					<Form.Label>Repeat Password</Form.Label>
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
				 <Button variant="primary" type="submit">
					Submit
        </Button>
				{show &&(
					<SweetAlert success title={formData.fullName}	timeout={3500} onConfirm={()=>onConfirm()}>
							You are successfully registered
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
