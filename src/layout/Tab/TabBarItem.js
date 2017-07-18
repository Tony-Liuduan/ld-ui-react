import React, {PropTypes} from 'react';
import classNames from 'classnames';

import TabBarIcon from './TabBarIcon';
import TabBarLabel from './TabBarLabel';
import './tab.scss';

// item of tabbar
const TabBarItem = (props) => {
	let {active, className, children, icon, activeIcon, label, ...other} = props;
	const cls = classNames({
		'ui-tabbar-item': true,
		'ui-tabbar-item-active': active,
		'ui-tabbar-item-noicon': !icon,
		'ui-tabbar-item-nolabel': !label
	}, className);

	icon = active ? activeIcon : icon;

	if (icon || label) {
		return (
			<div className={cls} {...other}>			
				{icon ? <TabBarIcon><img src={icon}/></TabBarIcon> : false}
				{label ? <TabBarLabel><p>{label}</p></TabBarLabel> : false}
			</div>
		);
	} else {
		return <div className={cls} {...other}>{children}</div>;
	}
}; 

TabBarItem.propTypes = {
	active: PropTypes.bool,
	icon: PropTypes.any,
	activeIcon: PropTypes.any,
	label: PropTypes.string
};

TabBarItem.defaultProps = {
	active: false,
	icon: false,
	activeIcon: false,
	label: ''
};

export default TabBarItem;
