import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {event, strMapToObj, each} from '../Base/Js/utils';
import {Button, ButtonArea} from '../Button/index';

// 用于统计当前的接收到的验证input数量
let n = 0;
class Submit extends Component {
	
	static propTypes = {

	};

	static defaultProps = {

	};

	constructor(props) {
		super(props);
		this.state = {
			validMap: new Set(),
			enabledMap: new Map(),
			validArr: [],
			flag: true
		};
		this.validsize = 0;
	}

	componentDidMount() {
		event.addListener('validate', this.handleValidate.bind(this));
		event.addListener('btnEnabeld', this.handleEnabeld.bind(this));
	}

	componentWillUnmount() {
		event.removeAllListeners();
		this.setState({validMap: new Set()});
		n = 0;
	}
	
	handleValidate(ops) {
		if (!this.button || !ops) return; // bugfix
		n++;
		let {validMap} = this.state;
		validMap = validMap.add(ops);
		this.setState({validMap});
		// 当接受完毕解析传入map
		if (this.validsize === n) this.parseValidMap(this.state.validMap);
	}

	handleEnabeld(key, value) {
		if (!this.button) return; // bugfix
		let {enabledMap} = this.state;
		enabledMap = enabledMap.set(key, value);
		this.setState({enabledMap});
		// 审查必须填写项全部填写
		this.parseEnabeldMap();
	}
	// 获取form中验证表单数量
	handleValidSize(size) {
		this.validsize = size;
	}

	handleValidRemove(target) {
		const {validArr} = this.state;
		let deleteIndex;	
		each(validArr, function(index) {
			if (this.target === target) {
				deleteIndex = index;
				return false
			} 
		});
		if (deleteIndex) {
			validArr.splice(deleteIndex, 1);
			n--;
			this.setState({validArr});
		}
	}

	handleClick(e) {
		const {validArr} = this.state;
		each(validArr, function(index) {
			const {target, validHook} = this;
			if (!validHook(target.value || (target.dataset.value && target.dataset.value === 'false' ? false : true))) {
				return false;
			}
		});
		
 		if (this.props.onClick) this.props.onClick(e); 
	}
	
	// 处理validMap, 分离出 requiredMap [], validMap []
	parseValidMap(data) {
		if (data.size <= 0) return;
		const validArr = [];
		let   value    = "";
		for (let item of data.keys()) {
			const {target, required, validation} = item,
				  {validHook} = validation;
			// 先判断按钮显示状态
			if (required) {
				if (target.type) {
					switch (target.type) {
						case 'checkbox':
						case 'radio':
							value = target.checked ? true : '';
							break;
						case 'select-one':
						case 'select-multiple':
							value = target.value;
							break;
						default:
							value = target.value;
							break;
					}
				} else {
					// target 为 div checkboxgroup
					value = target.dataset.value && target.dataset.value === 'false' ? '' : true
				}
				this.handleEnabeld(target, value);
			}
			// 归纳
			validArr.push(Object.assign({}, {target, validHook}));
		}	
		this.setState({validArr});
	}
	// 处理按钮显示状态
	parseEnabeldMap() {
		const {enabledMap} = this.state;
		if (enabledMap.size <= 0) return;
		let flag = true;
		for (let value of enabledMap.values()) {
			if (value == '') {
				flag = false;
				break;
			} 
			flag = true;
		}
		this.setState({flag});
	}

	render() {
		// 查收form中input数量
		event.addListener('validsize', this.handleValidSize.bind(this));
		event.addListener('validremove', this.handleValidRemove.bind(this));

		const {className, children, onClick, ...other} = this.props;
		const cls = classNames('ui-form', className);

		return <Button disabled={!this.state.flag} size="large" type="orange-white" onClick={this.handleClick.bind(this)} ref={ref => this.button = ref} {...other}> {children} </Button>
	}
}

export default Submit;