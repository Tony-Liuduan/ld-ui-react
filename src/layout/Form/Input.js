import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {CellClear, Cell} from '../Cell/index';

import './form.scss';

// wrapper for index
class Input extends Component {

	static contextTypes = {
		formFocus: PropTypes.func,
		formBlur: PropTypes.func,
		handleCellClear: PropTypes.func,
		clearInputValue: PropTypes.bool
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
		if ('autoFocus' in this.props) {
			this.context.formFocus(this.props.autoFocus);
			this.focusedInput.focus(); 
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.context.clearInputValue) {
			this.context.handleCellClear(false);
			this.setState({value: ''});
		}
	}

	onInputChange(e) {
		e.persist(); // 在React.js中执行去抖动

		this.setState({
			value: e.target.value
		})
		if (this.props.onChange) this.props.onChange(e);
	}

	onInputFocus(e) {
		e.persist(); // 在React.js中执行去抖动

		this.setState({
			focused: true,
		}, () => {
			if (this.context.formFocus) this.context.formFocus(this.state.focused);
		});

		if (this.props.onFocus) this.props.onFocus(e);
	}

	onInputBlur(e) {
		e.persist(); // 在React.js中执行去抖动

		this.setState({
			focused: false,
		}, () => {
			if (this.context.formBlur) this.context.formBlur(this.state.focused);
		});

		if (this.props.onBlur) this.props.onBlur(e);
	}

	render() {
		const {className, value, defaultValue, onChange, onFocus, onBlur, focused, autoFocus, ...other} = this.props;
		const cls = classNames('ui-input', className);
		
		return (
			<input className={cls} ref={(input) => {this.focusedInput = input;}} value={this.state.value} onChange={this.onInputChange.bind(this)} onFocus={this.onInputFocus.bind(this)} onBlur={this.onInputBlur.bind(this)} {...other} />
		);
	}

}

export default Input;