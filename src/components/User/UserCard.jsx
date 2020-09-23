import React, { Component } from 'react'
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class UserCard extends Component {
    render() {
        // const userData = this.props;
        // console.log(userData);
        return (
            <Card>
				<Card.Header></Card.Header>
				<Card.Body>
					asd
					<Link to={'/'} className="btn btn-md btn-primary">Go Home</Link>
				</Card.Body>
			</Card>
        )
    }
}
