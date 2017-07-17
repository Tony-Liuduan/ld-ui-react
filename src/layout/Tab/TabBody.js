import React from 'react';
import classNames from 'classnames';
import './tab.scss';

// tabbody for tab content's container, is wrapper for article
const TabBody = (props) => {
	const {children, className, ...other} = props;
	const cls = classNames({
		'ui-tab-body': true
	}, className);
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

export default TabBody;