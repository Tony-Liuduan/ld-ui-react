import React from 'react';
import classNames from 'classnames';
import './cell.scss';

// icon for cell

const CellIcon = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-icon': true,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

export default CellIcon;