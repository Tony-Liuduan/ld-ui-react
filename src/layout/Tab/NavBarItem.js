import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './tab.scss';

// NavbarItem to display info, is content of navbar
const NavBarItem = (props) => {
	const {component, href, children, active, className, ...other} = props;
	const DefaultComponent = href ? 'a' : 'div';
	const Component = component || DefaultComponent;
	const cls = classNames({
		'ui-navbar-item': true,
		'ui-navbar-item-active': active
	}, className);

	return (
		<Component className={cls} {...other} href={href}>
			<span>{children}</span>
		</Component>
	);
};

NavBarItem.propTypes = {
	active: PropTypes.bool,
	component: PropTypes.func
};

NavBarItem.defaultProps = {
	active: false
};

export default NavBarItem;
