import { CheckIcon, CircleSlashIcon, PencilIcon } from "@primer/octicons-react";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { CgDetailsMore } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaVoteYea } from "react-icons/fa";


export default function Poll(props) {
	const { _id, name, closed, edited } = props.data;
	const { isLoggedIn } = props.auth;
	const [show, setShow] = useState(false);
	const deletedConfirmed = () => {
		props.handleDeletePoll(_id);
	};
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
					<Col xs={6}>
						<Card.Title as="h5">{name}</Card.Title>
						
					</Col>
					{isLoggedIn && (
						<Col>
							<Button
								onClick={() => {
									setShow(true);
								}}
								variant="outline-danger"
							>
								<RiDeleteBinLine style={{fontSize:20}}/>
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
								<FaVoteYea style={{fontSize:20}}/>
							</Button>
						</Col>
					)}
					<Col>
						<Link
							to={{
								pathname: "/poll",
								state: {
									poll: props.data,
								},
							}}
							className={"btn btn-md btn-outline-secondary"}
						>
						<CgDetailsMore style={{fontSize:20}}/>
						</Link>
						
					</Col>
					
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
					You will not be able to recover this poll
				</SweetAlert>
			)}
			
		</Card>
	);
}
