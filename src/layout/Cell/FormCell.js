import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './cell.scss';

// form wrapper for Cell
const FormCell = (props) => {
	const {component, className, children, 
			radio, checkbox, radioInline, checkboxInline,
			select, selectPos,
			vcode, 
			...other
		} = props;
	
	const defaultComponent = (radio || checkbox) ? 'label' : 'div';
	const Component = component || defaultComponent;
	
	// 应为switch是  javascript中的关键字，直接写会报错，但为了风格统一，退而求其次，采用如下方法
	const others = Object.assign({}, other);
	delete others.switch;

	const cls = classNames({
		'ui-cell': true,
		'ui-cell-checkbox': radio || checkbox,
		'ui-cell-checkboxInline': radioInline || checkboxInline,
		'ui-cell-switch': props.switch,
		'ui-cell-select': select,
		['ui-cell-select-' + selectPos]: selectPos,
		'ui-cell-vcode': vcode
	}, className);
	
	return <Component className={cls} {...others}>{children}</Component>;
};

FormCell.propTypes = {
	component: PropTypes.func,
	radio: PropTypes.bool,
    checkbox: PropTypes.bool,
    select: PropTypes.bool,
    selectPos: PropTypes.string,  // before after
    'switch': PropTypes.bool,
    vcode: PropTypes.bool
};

FormCell.defaultProps = {
	radio: false,
    checkbox: false,
    select: false,
    selectPos: undefined,
    'switch': false,
    vcode: false,
};

export default FormCell;