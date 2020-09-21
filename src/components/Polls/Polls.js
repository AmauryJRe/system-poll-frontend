/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Poll from "./Poll/Poll";

export default class Polls extends Component {
    state = {
		polls: [],
	};

	componentDidMount() {
		this.handleRequest();
    }
    
    componentDidUpdate(){
        this.handleRequest();
    }
	handleRequest = () => {
		const urlPolls = `http://localhost:5000/poll`;
		fetch(urlPolls)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({
					polls: res,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
        const pollList = this.state.polls;
		return (
			<TransitionGroup>
            {
                pollList.map(poll=>(
                    <CSSTransition
                    key={poll._id}
                    className="fade"
                    timeout={1000}> 
                    <Poll data={poll}/>
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
		);
	}
}
