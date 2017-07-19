import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './cell.scss';

// cells item
const Cell = (props) => {
	const {children, className, href, htmlFor, component, ...other} = props;
	const DefaultComponent = href ? 'a' : htmlFor ? 'label' : 'div';
	const Component = component || DefaultComponent;
	const cls = classNames({
		'ui-cell': true,
		[className]: className
	});
	return (
		<Component
			className={cls}
			href={href}
			htmlFor={htmlFor}
			{...other}
		>
			{children}
		</Component>
	);

};

Cell.propTypes = {
	component: PropTypes.func
}

Cell.defaultProps = {
};

export default Cell;
