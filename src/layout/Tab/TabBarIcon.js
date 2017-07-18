import React from 'react';
import classNames from 'classnames';

import './tab.scss';

const TabBarIcon = (props) => {
	const {defaultImg, activeImg, children, className, ...other} = props;
	const cls = classNames({
		'ui-tabbar-icon': true
	}, className);

	return (
		<div className={cls} {...other}>{children}</div>
	);
};

export default TabBarIcon;