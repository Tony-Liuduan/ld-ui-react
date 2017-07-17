import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './button.scss';

const ButtonArea = (props) => {
	const {direction, className, children, ...other} = props;
	const cls = classNames({
		'ui-btn-area': true,
		['ui-btn-area-' + direction]: direction,
		[className]: className
	});

	return (
		<div {...other} className={cls}>{children}</div>
	);
};

ButtonArea.propTypes = {
	direction: PropTypes.string
};

ButtonArea.defaultProps = {
	direction: 'row' // row | column
};

export default ButtonArea;