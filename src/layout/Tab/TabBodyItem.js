import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './tab.scss';

// tabbody for tab content's container, is wrapper for article
const TabBodyItem = (props) => {
	const {children, active, className, ...other} = props;
	const cls = classNames({
		'ui-tab-body-item': true,
		'ui-tab-body-item-active': active,
	}, className);
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

TabBodyItem.propTypes = {
	active: PropTypes.bool
};

TabBodyItem.defaultProps = {
	active: false
};

export default TabBodyItem;