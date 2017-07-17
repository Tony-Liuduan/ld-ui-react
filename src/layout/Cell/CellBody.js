import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './cell.scss';

/**
 * Content of `Cell`
 */

 const CellBody = (props) => {
	const {children, className, primary, ...other} = props;
	const cls = classNames({
		'ui-cell-body': true,
		'ui-cell-primary': primary,
		[className]: className
	});
	return (
		<div className={cls} {...other}>
			{children}
		</div>
	);
 };

 CellBody.propTypes = {
 	// if cellbody is the primary block
	primary: PropTypes.bool
 };

 CellBody.defaultProps = {
	primary: false
 }

 export default CellBody;