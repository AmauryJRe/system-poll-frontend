import { CheckIcon, CircleSlashIcon, PencilIcon } from "@primer/octicons-react";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Poll(props) {
	const greetToLog = (data) => {
		console.log(data);
	};

	const { _id, name, options, closed, edited } = props.data;
	return (
		<Card className="shadow mb-3" border="light">
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
					<Col>
						<Button onClick={() => props.handleDelete(_id)} variant="outline-danger">
							Delete
						</Button>
					</Col>
					<Col>
						<Link
							to={{
								pathname: "/editpoll",
								state: {
									pollToEdit: props.data,
								},
								sendDataToApi:props.sendDataToApi,
								handleRequest:props.handleRequest
							}}
							className={closed ? "btn btn-md btn-outline-secondary disabled" : "btn btn-md btn-outline-secondary"}
						>
							Edit
						</Link>
					</Col>
					<Col>
						<Button variant="outline-secondary" disabled={closed} onClick={!closed ? () => {props.setVisible();props.setCurrentPoll(props.data)} : null}>
							Details
						</Button>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}
