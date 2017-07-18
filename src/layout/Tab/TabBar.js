import React from 'react';
import classNames from 'classnames';
import './tab.scss';

// wrapper for tabbar
const TabBar = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-tabbar': true
	}, className);

	return (
		<div className={cls} {...other}>{children}</div>
	);
};

export default TabBar;