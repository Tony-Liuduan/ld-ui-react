import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './button.scss';

class Button extends Component {

	static propTypes = {
		type: PropTypes.string,
		size: PropTypes.string,
		disabled: PropTypes.bool,
		component: PropTypes.func
	};

	static defaultProps = {
		type: 'default', // default, white-orange, orange-white, white-blue, blue-whit
		size: 'normal', // normal, small, large
		disabled: false,  // true, false
	};

	render() {
		const { component, type, size, className, children, ...other } = this.props;
		const DefaultComponent = this.props.href ? 'a' : 'button';
		const Component = component || DefaultComponent;
		const cls = classNames({
			'ui-btn': true,
			'ui-btn-disabled': this.props.disabled,
			['ui-btn-' + type]: type,
			['ui-btn-' + size]: size,
			[className]: className
		});

		return <Component {...other} className={cls}>{children}</Component>
	}
};

export default Button;