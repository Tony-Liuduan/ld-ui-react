import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {event} from '../Base/Js/utils';
import {CellClear, Cell} from '../Cell/index';
import ValidateHoc from './ValidateHoc';

import './form.scss';

// wrapper for index
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

		this.props.getTarget(this.focusedInput);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.context.clearInputValue) {
			this.context.handleCellClear(false);
			// 清空并告诉submit
			this.setState({value: ''}, () => {this.handleEmit(this.focusedInput, this.focusedInput.value)});
		}
	}

	onInputChange(e) {
		e.persist(); // 在React.js中执行去抖动
		this.setState({value: e.target.value}, this.autoShowClear(e)); // 自动显示隐藏clear btn
		// 监听submit状态
		this.handleEmit(e.target, e.target.value);
		if (this.props.onChange) this.props.onChange(e);
	}

	onInputFocus(e) {
		e.persist(); // 在React.js中执行去抖动
		this.autoShowClear(e); // 自动显示clear btn
		if (this.props.onFocus) this.props.onFocus(e);
	}

	onInputBlur(e) {
		e.persist(); // 在React.js中执行去抖动
		this.autoHiddenClear();  // 自动隐藏clear btn
		this.handleValidate(e);
		if (this.props.onBlur) this.props.onBlur(e);
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

	handleEmit(target, value) {
		if (this.props.validateHOC.required) event.emit('btnEnabeld', target, value);
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