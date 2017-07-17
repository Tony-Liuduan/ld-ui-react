import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './cell.scss';

// header for cell

const CellHeader = (props) => {
	const {children, className, primary, ...other} = props;
	const cls = classNames({
		'ui-cell-header': true,
		'ui-cell-primary': primary,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
};

CellHeader.propTypes = {
	primary: PropTypes.bool
};

CellHeader.defaultProps = {
	primary: false
};

export default CellHeader;