import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './cell.scss';

// form wrapper for Cell
class FormCell extends Component {

	static propTypes = {
		component: PropTypes.func,
		radio: PropTypes.bool,
		checkbox: PropTypes.bool,
		select: PropTypes.bool,
    	selectPos: PropTypes.string,  // before after
    	'switch': PropTypes.bool,
    	vcode: PropTypes.bool
	};
	
	static defaultProps = {
		radio: false,
		checkbox: false,
		select: false,
		selectPos: undefined,
		'switch': false,
		vcode: false
	};

	static childContextTypes = {
		formFocus: PropTypes.func, 		 // 通知 Input 获取焦点 执行回调
		formBlur: PropTypes.func,		 // 通知 Input 失去焦点 执行回调
		handleCellClear: PropTypes.func, // CellClear 通知 清除 input value
		showCellClear: PropTypes.bool,   // 显示 x 标识
		clearInputValue: PropTypes.bool  // 清除input value 标识
	};
	
	state = {
		showCellClear: false,
		clearInputValue: false
	};

	getChildContext() {
		return {
			formFocus: (focused) => this.setState({showCellClear: focused}),
			formBlur: (focused) => this.setState({showCellClear: focused}),
			handleCellClear: (clear) => this.setState({clearInputValue: clear}),
			showCellClear: this.state.showCellClear,
			clearInputValue: this.state.clearInputValue
		};
	}

	render() {
		const {component, className, children, 
			radio, checkbox, radioInline, checkboxInline,
			select, selectPos,
			vcode, 
			...other
		} = this.props;

		const defaultComponent = (radio || checkbox) ? 'label' : 'div';
		const Component = component || defaultComponent;

		// 应为switch是  javascript中的关键字，直接写会报错，但为了风格统一，退而求其次，采用如下方法
		const others = Object.assign({}, other);
		delete others.switch;
	
		const cls = classNames({
			'ui-cell': true,
			'ui-cell-checkbox': radio || checkbox,
			'ui-cell-checkboxInline': radioInline || checkboxInline,
			'ui-cell-switch': this.props.switch,
			'ui-cell-select': select,
			['ui-cell-select-' + selectPos]: selectPos,
			'ui-cell-vcode': vcode
		}, className);
		
		return <Component className={cls} {...others}>{children}</Component>;
	}
};

export default FormCell;