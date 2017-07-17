import React from 'react';
import classNames from 'classnames';
import './tab.scss';

// wrapper for navbar 
const NavBar = (props) => {
	const {className, children, ...other} = props;
	const cls = classNames({
		'ui-navbar': true
	}, className);
	
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

export default NavBar;