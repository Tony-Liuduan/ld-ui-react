import React, {PropTypes} from 'react';
import classNames from 'classnames';
import './cell.scss';
 
// arraw for cell 右箭头 下箭头

const CellArrow = (props) => {
	const {children, className, direction, ...other} = props;
	const cls = classNames({
		'ui-cell-arrow': true
	}, className);

	return (
		<div className={cls} {...other}>
			<span className={'ui-cell-arrow-' + direction}>{children}</span>
		</div>
	);
};

CellArrow.propTypes = {
	direction: PropTypes.string
};

CellArrow.defaultProps = {
	direction: 'right' // right bottom
};

export default CellArrow;