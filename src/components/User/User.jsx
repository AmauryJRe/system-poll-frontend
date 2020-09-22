import { CheckIcon, CircleSlashIcon, PencilIcon } from "@primer/octicons-react";
import React, { useState } from "react";
import { Button, Card, Col, Row ,Image} from "react-bootstrap";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
export default function Poll(props) {
	const greetToLog = (data) => {
		console.log(data);
	};

	const { id, name, options, closed, edited } = props.data;
	const { isLoggedIn } = props.auth;
	const [show, setShow] = useState(false);
	const deleConfirmed = () => { 
		props.handleDelete(id)  
  }
	return (
    <Card className="shadow mb-3" border="light">
      <Card.Header></Card.Header>
			<Card.Body>
				<Row>
					<Col>
						{closed ? (
							<CircleSlashIcon size="medium" aria-label="Closed" />
						) : edited ? (
							<PencilIcon size="medium" aria-label="Edited" />
						) : (
							<CheckIcon size="medium" aria-label="NewPoll" />
						)}
					</Col>
					<Col xs={8}>
						<Card.Title as="h5">{name}</Card.Title>
          </Col>
          <Col xs={6} md={4}>
            <Image src="holder.js/171x180" roundedCircle />
          </Col>
					{isLoggedIn && (
						<Col>
							<Button onClick={() => { setShow(true) }}variant="outline-danger">
								Delete
							</Button>
						</Col>
					)}
					{isLoggedIn && (
						<Col>
							<Link
								to={{
									pathname: "/editpoll",
									state: {
										pollToEdit: props.data,
									},
									sendDataToApi: props.sendDataToApi,
									handleRequest: props.handleRequest,
								}}
								className={closed ? "btn btn-md btn-outline-secondary disabled" : "btn btn-md btn-outline-secondary"}
							>
								Edit
							</Link>
						</Col>
					)}
					{isLoggedIn && (
						<Col>
							<Button
								variant="outline-secondary"
								disabled={closed}
								onClick={
									!closed
										? () => {
												props.setVisible();
												props.setCurrentPoll(props.data);
										  }
										: null
								}
							>
								Details
							</Button>
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
					onConfirm={deleConfirmed}
					onCancel={() => { setShow(false) }}
					focusCancelBtn
						>
							You will not be able to recover this poll
						</SweetAlert>
				)}
		</Card>
	);
}
