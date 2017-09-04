import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ValidateHoc from './ValidateHoc';
import { event } from '../Base/Js/utils';

class CheckboxGroup extends Component {

	static propTypes = {
		required: PropTypes.bool,
		type: PropTypes.string,
		id: PropTypes.any.isRequired
	};

	static defaultProps = {
		required: false,
		type: "checkbox",
		id: '0'
	};

	static childContextTypes = {
		requiredGroup: PropTypes.bool,		 // 通知 checkbox 该组checkbox是必须的
		emitName: PropTypes.string
	};

	getChildContext() {
		return {
			requiredGroup: this.props.required || this.props.validate.required || false,
			emitName: 'checkboxGroup' + this.props.id
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			childrenMap: new Map(),
			value: false
		};
	}

	componentDidMount() {
		if (this.props.required || this.props.validate.required) {
			this.props.getTarget(this.checkboxGroup);
			event.addListener('checkboxGroup' + this.props.id, this.handleChange.bind(this));
			const checkboxGroupDOM = ReactDOM.findDOMNode(this),
				  checkboxes = checkboxGroupDOM.querySelectorAll("input[type=" + this.props.type + "]");
			this.initValidate(checkboxes);
		}
	}

	componentWillUnmount() {
		event.removeAllListeners();
	}

	// checkbox 变化监听操作
	handleChange(target, value) {
		let { childrenMap } = this.state;
		childrenMap = childrenMap.set(target, value);
		this.setState({ childrenMap });
		this.parseChildrenMap(this.state.childrenMap);
	}

	// 初始化选中验证
	initValidate(arg) {
		if (arg.length <= 0) return;
		let flag = false;
		for (let value of arg) {
			if (value.checked) {
				flag = true;
				break;
			}
			flag = false;
		}
		this.setState({ value: flag }, () => {this.emitEnable()});
	}

	// change 后选中验证
	parseChildrenMap(arg) {
			if (arg.size <= 0) return;
			let flag = false;
			for (let value of arg.values()) {
				if (value) {
					flag = true;
					break;
				} 
				flag = false;
			}
			this.setState({ value: flag }, () => {this.emitEnable()});
	}
	// 通知submit组内选中状态
	emitEnable() {
		this.props.validateHOC.emitEnable(this.checkboxGroup, this.state.value ? true : '');
	}

	render() {
		const { className, children, required, validate, validateHOC, getTarget, type, ...other } = this.props;
		const cls = classNames('ui-checkbox-group', className);

		return (
			<div className={cls} data-value={this.state.value} ref={(ref) => { this.checkboxGroup = ref; }} {...other}> {children} </div>
		);
	}
};

export default ValidateHoc(CheckboxGroup);