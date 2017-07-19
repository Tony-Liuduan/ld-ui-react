import React from 'react';
import classNames from 'classnames';
import './cell.scss';

/**
 * Content of `Cell`
 */

 const CellContent = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-content': true,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
 };

 export default CellContent;