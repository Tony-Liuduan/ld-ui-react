import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './cell.scss';

// form wrapper for Cell
const FormCell = (props) => {
	const {component, className, children, radio, checkbox, select, vcode, ...other} = props;
	
	const defaultComponent = (radio || checkbox) ? 'label' : 'div';
	const Component = component || defaultComponent;
	
	const cellDomProps = Object.assign({}, other);
	delete cellDomProps.switch;

	const cls = classNames({
		'ui-cell': true,
		'ui-cells-label': radio || checkbox,
	}, className);
	
	return <Component className={cls} {...cellDomProps}>{children}</Component>;
};

FormCell.propTypes = {
	component: PropTypes.func,
	radio: PropTypes.bool,
    checkbox: PropTypes.bool
};

FormCell.defaultProps = {
	radio: false,
    checkbox: false
};

export default FormCell;