import React from 'react';
import classNames from 'classnames';
import './cell.scss';

// cells title
const CellsTitle = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cells-title': true
	}, className);

	return (
		<div className={cls} {...other}>{children}</div>
	);
};

export default CellsTitle;