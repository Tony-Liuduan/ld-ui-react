import React, {Component}from 'react';
import classNames from 'classnames';
import ValidateHoc from './ValidateHoc';
import './form.scss';

// agreement
class Agreement extends Component {

	componentDidMount() {
		this.props.getTarget(this.agreement);
	}

	render() {
		const {children, className, label, onChange, validate, validateHOC, getTarget, ...other} = this.props;
		const cls = classNames({'ui-agreement': true}, className);

		return (
			<div className={cls}>
				<label>
					<input type="checkbox" className="ui-agreement-checkbox" ref={(ref) => {this.agreement = ref;}} onChange={validateHOC.handleChange} {...other} />
					<span className="ui-agreement-text">{label}</span>
				</label>
				{children}
			</div>
		);
	}
};

export default ValidateHoc(Agreement);
