import Axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory } from "react-router-dom";

export default function EditUserForm(props) {
	const [formData, setOptions] = useState({});
	const [show, setShow] = useState(false);
	const [errors, setErrors] = useState("");
	const [showError, setShowError] = useState(false);
	const [fileState, setFileState] = useState({
		selectedFile: null,
	});

	const userToEdit = Object.assign({}, props.location.state.userToEdit);
	let history = useHistory();

	const sendDataToApi = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("image", fileState.selectedFile);
		data.append("id", userToEdit._id);
		data.append("fullName", formData.fullName||userToEdit.fullName);
		data.append("role", formData.role||userToEdit.role);

		var config = {
			method: "patch",
			url: `http://localhost:5000/userprofile`,
			headers: {
				"Content-Type": "application/json",
				"header-auth-token": localStorage.getItem("polls.token"),
			},
			data:data
		};

		Axios(config)
			.then((response) => {
				setShow(true);
			})
			.catch((err) => {
				const { error } = err.response && err.response ? err.response.data : err.message;
				setShowError(true);
				setErrors(error);
			});

	};

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		formData[name] = value;
		setOptions(formData);
	};

	const onConfirm = () => {
		setShow(false);
		history.push("/");
	};
	const onConfirmError = () => {
		setShowError(false);
	};
	const onChangeHandler = (event) => {
		setFileState({
			selectedFile: event.target.files[0],
			loaded: 0,
		});
	};

	return (
		<div className="container col-md-6">
			<Form onSubmit={(e) => sendDataToApi(e)}>
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="text"
						name="fullName"
						defaultValue={userToEdit.fullName}
						placeholder="Full Name"
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlInput">
					<Form.Label>Role</Form.Label>
					<Form.Control
						type="text"
						name="role"
						defaultValue={userToEdit.role}
						placeholder="role"
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.File
						className="position-relative"
						required
						name="image"
						label="Avatar"
						// isInvalid={!!errors.file}
						// feedback={errors.file}
						id="validationFormik107"
						feedbackTooltip
						onChange={(e) => onChangeHandler(e)}
						custom
					/>
				</Form.Group>
				<Button variant="outline-success" type="submit">
					Submit
				</Button>
				{show && (
					<SweetAlert success title={formData.username} timeout={1700} onConfirm={() => onConfirm()}>
						User Was edited successfully
					</SweetAlert>
				)}
				{showError && (
					<SweetAlert error title="Error" timeout={3500} onConfirm={() => onConfirmError()}>
						{errors}
					</SweetAlert>
				)}
			</Form>
		</div>
	);
}
