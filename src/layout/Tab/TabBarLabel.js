import React from 'react';
import classNames from 'classnames';

import './tab.scss';

const TabBarLabel = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-tabbar-label': true
	}, className);

	return (
		<div className={cls} {...other}>{children}</div>
	);
};

export default TabBarLabel;