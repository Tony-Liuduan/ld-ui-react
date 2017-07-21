import React from 'react';
import classNames from 'classnames';
import './cell.scss';

// form header
const FormHeader = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-form-header': true
	}, className);

	return (
		<div className={cls} {...other}>{children}</div>
	);
};

export default FormHeader;