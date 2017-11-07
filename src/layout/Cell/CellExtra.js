import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './cell.scss';

// extra for cell 

const CellExtra = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-cell-extra': true
	}, className);
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

export default CellExtra;