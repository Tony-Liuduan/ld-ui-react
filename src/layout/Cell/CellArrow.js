import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './cell.scss';

// footer for cell

const CellArrow = (props) => {
	const {children, className, primary, ...other} = props;
	const cls = classNames({
		'ui-cell-arrow': true,
		'ui-cell-primary': primary,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

CellArrow.propTypes = {
	primary: PropTypes.bool
}

CellArrow.defaultProps = {
	primary: false
};

export default CellArrow;