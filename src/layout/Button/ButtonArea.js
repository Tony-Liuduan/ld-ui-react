import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

const ButtonArea = (props) => {
	const {direction, className, children, space, ...other} = props;
	const cls = classNames({
		'ui-btn-area': true,
		'ui-btn-area-space': space,
		['ui-btn-area-' + direction]: direction,
		[className]: className
	});

	return (
		<div {...other} className={cls}>{children}</div>
	);
};

ButtonArea.propTypes = {
	direction: PropTypes.string,
	space: PropTypes.bool
};

ButtonArea.defaultProps = {
	direction: 'row', // row | column
	space: false
};

export default ButtonArea;