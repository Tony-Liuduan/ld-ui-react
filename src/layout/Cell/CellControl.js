import React from 'react';
import classNames from 'classnames';
import './cell.scss';

/**
 *  Cell body container for input
 */

 const CellControl = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-control': true,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
 };

 export default CellControl;