import { CheckIcon, CircleSlashIcon, PencilIcon } from "@primer/octicons-react";
import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Poll extends Component {
	greetToLog = (opt) => {
		console.log(opt);
	};

	render() {
		const { name, options, closed, edited } = this.props.data;
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
						<Col xs={9}>
							<Card.Title as="h5">{name}</Card.Title>
						</Col>
						<Col>
							<Link
								to={{
									pathname:'/editpoll',
									state:{
										pollToEdit:this.props.data
									}
								}}
								className={closed ? "btn btn-md btn-outline-secondary disabled" : "btn btn-md btn-outline-secondary"}
							>
								Edit
							</Link>
						</Col>
						<Col>
							<Button
								variant="outline-secondary"
								disabled={closed}
								onClick={!closed ? () => this.greetToLog(options) : null}
							>
								Details
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		);
	}
}
