import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ValidateHoc from './ValidateHoc';

// wrapper for textarea
class Textarea extends Component {

	static propTypes = {
		maxLength: PropTypes.number,
		showCounter: PropTypes.bool,
		defaultValue: PropTypes.string
	};

	static defaultProps = {
		showCounter: true,
		defaultValue: ''
	};

	state = {
		textCounter: this.props.defaultValue ? this.props.defaultValue.length : 0
	};

	componentDidMount() {
		this.props.getTarget(this.textarea);
	}
	
	handleChange(e) {
		this.setState({textCounter: e.target.value.length});
		const {validateHOC} = this.props;
		// 监听submit状态
		if (validateHOC.required) validateHOC.handleChange(e);
	}

	renderCounter(maxLength) {
		return (
			<div className="ui-textarea-counter">
				<span>{this.state.textCounter}</span>{maxLength ? '/' + maxLength : false}
			</div>
		);
	}
	
	render() {
		const {className, children, maxLength, showCounter, onChange, validate, validateHOC, getTarget, ...other} = this.props;
		const cls = classNames({'ui-textarea': true}, className);

		return (
			<div>
				<textarea className={cls} maxLength={maxLength} ref={(ref) => {this.textarea = ref;}} onChange={this.handleChange.bind(this)} {...other}>
					{children}
				</textarea>
				{showCounter ? this.renderCounter(maxLength) : false}
			</div>
		);
	}
};

export default ValidateHoc(Textarea);
