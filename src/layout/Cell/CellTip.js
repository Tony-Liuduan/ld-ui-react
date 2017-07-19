import React from 'react';
import classNames from 'classnames';
import './cell.scss';

// cells tip  如：单位: 万

const CellTip = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-tip': true
	}, className);

	return (
		<div className={cls} {...other}>{children}</div>
	);
};

export default CellTip;
