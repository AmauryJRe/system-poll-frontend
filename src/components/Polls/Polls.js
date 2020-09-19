/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Poll from "./Poll/Poll";

export default class Polls extends Component {
	render() {
		const elements = this.props.polls;
		return (
			<TransitionGroup>
            {
                elements.map(element=>(
                    <CSSTransition
                    key={element}
                    className="fade"
                    timeout={1000}> 
                    <Poll/>
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
		);
	}
}
