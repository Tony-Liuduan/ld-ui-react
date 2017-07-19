import React from 'react';
import classNames from 'classnames';
import './cell.scss';

// clear for cell 清空信息

const CellClear = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-clear': true
	}, className);

	return (
		<div className={cls} {...other}>
			<span className="ui-cell-clear-icon">{children}</span>
		</div>
	);
};

export default CellClear;