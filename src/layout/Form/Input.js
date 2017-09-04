import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {CellClear, Cell} from '../Cell/index';
import ValidateHoc from './ValidateHoc';

import './form.scss';

// wrapper for input
class Input extends Component {

	static contextTypes = {
		formFocus: PropTypes.func,
		formBlur: PropTypes.func,
		handleCellClear: PropTypes.func,
		clearInputValue: PropTypes.bool,
		validate: PropTypes.object,
	};	

	static propTypes = {
		validate: PropTypes.object,
	};

	static defaultProps = {
		validate: {},
	};

	constructor(props) {
		super(props);
		this.state = {
			focused: this.props.autoFocus || false,
			value: this.props.value || this.props.defaultValue || ''
		};
	}

	componentDidMount() {
		// 自动获取焦点
		if ('autoFocus' in this.props && !this.focusedInput.readOnly) {
			this.context.formFocus(this.props.autoFocus);
			this.focusedInput.focus(); 
		}
		if (this.props.required || this.props.validate.required) {
			this.props.getTarget(this.focusedInput);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.context.clearInputValue) {
			this.context.handleCellClear(false);
			// 清空并告诉submit
			this.setState({value: ''}, () => {
				this.props.validateHOC.required && 
				this.props.validateHOC.emitEnable(this.focusedInput, this.focusedInput.value)
			});
		}
	}

	onInputChange(e) {
		e.persist(); // 在React.js中执行去抖动
		this.setState({value: e.target.value}, this.autoShowClear(e)); // 自动显示隐藏clear btn
		const {validateHOC} = this.props;
		// 监听submit状态
		if (validateHOC.required) validateHOC.handleChange(e);
	}

	onInputFocus(e) {
		e.persist(); // 在React.js中执行去抖动
		this.autoShowClear(e); // 自动显示clear btn
		if (this.props.onFocus) this.props.onFocus(e);
	}

	onInputBlur(e) {
		e.persist(); // 在React.js中执行去抖动
		// 通过异步操作保证先执行clearbtn中click事件，后执行input的onblur事件，保证clearbtn的存在可以清楚value
		setTimeout(() => {
			// 异步执行 需要先判断目标是否被删除
			if (!e.target) return;
			this.autoHiddenClear();  // 自动隐藏clear btn
			this.handleValidate(e);  // 校验input value
 			if (this.props.onBlur) this.props.onBlur(e);
		}, 0);
	}
	// 自动显示clear btn 当没有value时不显示clear btn
	autoShowClear() {
		setTimeout(() => {
			if (!!this.state.value) {
				this.setState({
					focused: true,
				}, () => {
					if (this.context.formFocus) this.context.formFocus(this.state.focused);
				});
			} else {
				this.autoHiddenClear();
			}
		}, 0)
	}
	// 自动取消clear btn
	autoHiddenClear() {
		this.setState({
			focused: false,
		}, () => {
			if (this.context.formBlur) this.context.formBlur(this.state.focused);
		});
	}
	// 失去焦点进行校验
	handleValidate(e) {
		const {value} = this.state, {validateHOC, readOnly} = this.props;
		// readonly & 判断是否需要输入过程中validate
		if (readOnly || !validateHOC.validInline) return;
		// 失去焦点校验value
		validateHOC.validHook(value);
	}

	render() {
		const {className, value, validate, validateHOC, getTarget, defaultValue, onChange, onFocus, onBlur, focused, autoFocus, ...other} = this.props;
		const cls = classNames('ui-input', className);
		
		return (
			<input className={cls} ref={(input) => {this.focusedInput = input;}} value={this.state.value} onChange={this.onInputChange.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)} {...other} />
		);
	}

}

export default ValidateHoc(Input);