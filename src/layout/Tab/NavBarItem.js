import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './tab.scss';

// NavbarItem to display info, is content of navbar
const NavBarItem = (props) => {
	const {children, active, className, ...other} = props;
	const cls = classNames({
		'ui-navbar-item': true,
		'ui-navbar-item-active': active
	}, className);

	return (
		<div className={cls} {...other}>
			<span>{children}</span>
		</div>
	);
};

NavBarItem.propTypes = {
	active: PropTypes.bool
};

NavBarItem.defaultProps = {
	active: false
};

export default NavBarItem;
