import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

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
	
	handleChange(e) {
		this.setState({textCounter: e.target.value.length});
		if (this.props.onChange) this.props.onChange(e)
	}

	renderCounter(maxLength) {
		return (
			<div className="ui-textarea-counter">
				<span>{this.state.textCounter}</span>{maxLength ? '/' + maxLength : false}
			</div>
		);
	}
	
	render() {
		const {className, children, maxLength, showCounter, ...other} = this.props;
		const cls = classNames({'ui-textarea': true}, className);

		return (
			<div>
				<textarea className={cls} maxLength={maxLength} onChange={this.handleChange.bind(this)} {...other}>
					{children}
				</textarea>
				{showCounter ? this.renderCounter(maxLength) : false}
			</div>
		);
	}
};

export default Textarea;
