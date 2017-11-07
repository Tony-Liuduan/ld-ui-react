import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './cell.scss';

// cells item
const Cell = (props) => {
	const {children, className, href, htmlFor, link, component, ...other} = props;
	const DefaultComponent = href ? 'a' : htmlFor ? 'label' : 'div';
	const Component = component || DefaultComponent;
	const cls = classNames({
		'ui-cell': true,
		'ui-cell-link': link,
		[className]: className
	});
	return (
		<Component
			className={cls}
			htmlFor={htmlFor}
			href={href}
			{...other}
		>
			{children}
		</Component>
	);

};

Cell.propTypes = {
	component: PropTypes.func,
	link: PropTypes.bool
};

Cell.defaultProps = {
	link: false
};

export default Cell;
