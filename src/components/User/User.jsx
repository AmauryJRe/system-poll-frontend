import React, { useState } from "react";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
export default function Poll(props) {
	
	const { id, username, fullName, avatar ,role } = props.data;
	
	let TYPED_ARRAY = new Uint8Array(avatar.data.data);
	const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {return data + String.fromCharCode(byte);}, '');
	let base64String = btoa(STRING_CHAR);
	
	const { isLoggedIn } = props.auth;
	const [show, setShow] = useState(false);
	const deletedConfirmed = () => {
		props.handleDelete(id);
	};
	return (
		<Card className="shadow mb-3" border="light">
			<Card.Body>
				<Row>
					<Col xs={1} md={1}>
						<Image src={`data:${avatar.contentType};base64,${base64String}`} width='50' height='50' roundedCircle />
					</Col>
					<Col xs={2}>
						<Card.Title as="h5">{username}</Card.Title>
					</Col>
					<Col xs={5}>
						<Card.Title as="h5">{fullName}</Card.Title>
					</Col>
					{isLoggedIn && (
						<Col>
							<Button
								onClick={() => {
									setShow(true);
								}}
								variant="outline-danger"
							>
								Delete
							</Button>
						</Col>
					)}
					{isLoggedIn && (
						<Col>
							<Link
								to={{
									pathname: "/edituser",
									state: {
										userToEdit: {id,fullName,role},
									}
								}}
								className={"btn btn-md btn-outline-secondary"}
							>
								Edit
							</Link>
						</Col>
					)}
					{isLoggedIn && (
						<Col>
							<Link
							to={{
								pathname: "/user",
								state: {
									user: { id, username, fullName, avatar ,role },
								},
							}}
							className={"btn btn-md btn-outline-secondary"}
						>
							Details
						</Link>
						</Col>
					)}
				</Row>
			</Card.Body>
			{show && (
				<SweetAlert
					warning
					showCancel
					confirmBtnText="Yes, delete it!"
					confirmBtnBsStyle="danger"
					title="Are you sure?"
					onConfirm={deletedConfirmed}
					onCancel={() => {
						setShow(false);
					}}
					focusCancelBtn
				>
					You will not be able to recover this user
				</SweetAlert>
			)}
		</Card>
	);
}
