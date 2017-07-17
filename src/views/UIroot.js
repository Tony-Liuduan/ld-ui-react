import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './UIroot.scss';
class UIroot extends Component {
	render() {
		return (
			<ReactCSSTransitionGroup
				component="div"
				transitionName="example"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
				style={{height: '100%'}}
			>
				{/*克隆并返回一个新的 ReactElement （内部子元素也会跟着克隆），新返回的元素会保留有旧元素的 props、ref、key，也会集成新的 props（只要在第二个参数中有定义）。*/}
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname
				})}
			</ReactCSSTransitionGroup>
		);
	}
}

export default UIroot;