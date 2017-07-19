import React from 'react';
import classNames from 'classnames';
import './cell.scss';

// label for cell

const CellLabel = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-label': true,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

export default CellLabel;