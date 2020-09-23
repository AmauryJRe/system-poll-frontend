import React, { Component } from "react";
import { Badge, Button, Card, Col, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class PollCard extends Component {
	render() {
		const pollData = this.props.location.state.poll;
		const { options } = pollData;
		let opts = Object.assign({}, options);
		let keys = [];
		let total = 0;
		Object.keys(opts).forEach((key) => {
			keys.push(key);
			total += opts[key];
		});
		return (
			<Card>
				<Card.Header>{pollData.name}</Card.Header>
				<Card.Body>
					{keys.map((key) => {
						return (
							<div className="my-2">
								<Col>
									<h4>{key+' '}
                                    <Badge variant="primary">{opts[key]}</Badge>
                                    </h4>
								</Col>
								<Col>
									<ProgressBar
										animated
										now={(opts[key] * 100) / total}
										label={`${Math.round((opts[key] * 100) / total)}%`}
									/>
								</Col>
							</div>
						);
					})}
					<Link to={'/'} className="btn btn-md btn-primary">Go Home</Link>
				</Card.Body>
			</Card>
		);
	}
}
