import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './button.scss';

const Button = (props) => {
	const {component, type, size, className, children, ...other} = props;
	const DefaultComponent = props.href ? 'a' : 'button';
	const Component = component || DefaultComponent;
	const cls = classNames({
		'ui-btn': true,
		'ui-btn-disabled': props.disabled,
		['ui-btn-' + type]: type,
		['ui-btn-' + size]: size,
		[className]: className
	});

	return (
		<Component {...other} className={cls}>{children}</Component>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	size: PropTypes.string,
	disabled: PropTypes.bool,
	component: PropTypes.func
};

Button.defaultProps = {
	type: 'default', // default, white-orange, orange-white, white-blue, blue-whit
	size: 'normal', // normal, small, large
	disabled: false,  // true, false
};

export default Button;