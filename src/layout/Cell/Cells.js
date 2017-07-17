import React from 'react';
import classNames from 'classnames';
import './cell.scss';

/*
 * Wrapper for `Cell`
 */

const Cells = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cells': true,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

export default Cells;