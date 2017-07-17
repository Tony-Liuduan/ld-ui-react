import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './cell.scss';

const Cell = (props) => {
	const {children, className, href, htmlFor, component, ...other} = props;
	const DefaultComponent = href ? 'a' : htmlFor ? 'label' : 'div';
	const CellComponent = component || DefaultComponent;
	const cls = classNames({
		'ui-cell': true,
		[className]: className
	});
	return (
		<CellComponent
			className={cls}
			href={href}
			htmlFor={htmlFor}
			{...other}
		>
			{children}
		</CellComponent>
	);

};

Cell.propTypes = {
	component: PropTypes.func
}

Cell.defaultProps = {
};

export default Cell;
