import React, {Component, PropTypes} from 'react';
import {event} from '../Base/Js/utils';
let id = 0;
// 用于拦截表单组件，进行value 的 validate 校验
const ValidateHoc = (Input) => 
	class ValidateHoc extends Component {

		static propTypes = {
			validate: PropTypes.object,
			required: PropTypes.bool
		};

		static defaultProps = {
			validate: {},
			required: false
		};

		constructor(props) {
			super(props);
			this.state = {
				validProps: {},
				validation:{},
				isValid: true,
				messageInline: ""
			};
		}

		componentDidMount() {
			const {validate, required} = this.props;
			// 判断validate 有无，没有不往下进行，有则绑定 validate 相关属性
			if (Object.keys(validate).length > 0 || required) {
				id++;
				this.bindValidation();
			}
		}

		componentWillUnmount() {
			// 通知submit
			event.emit('validremove', this.target);
		}

		// 给没有表单项绑定验证功能
		bindValidation() {
			const {validType, hint, rules, required, validInline} = this.props.validate;
			const validProps = {
				validType: validType || [],
				hint: hint || "请输入正确格式",
				rules: rules || {},
				required: required || this.props.required || false,
				validInline: validInline != undefined ? validInline : true
			};
			this.setState({
				validProps,
				validation: {
					validHook: this.validHook.bind(this),
					showHint: this.showHint.bind(this)
				}
			}, () => {event.emit('validate', {target: this.target, validProps: Object.assign({}, validProps), validation: Object.assign({}, this.state.validation)})});
		}
		// 验证value是否通过 返回 true || false
		validHook(val) {
			const {validType, hint, rules, required} = this.state.validProps;
			let isValid;
			// 先判断是否是必填项
			if (required && val === "") {
				console.log('啥都不填就不让你过');
				return this.handleIsValid(false);
			}
			// 再判断是否有验证规则map对象, 验证通过
			if (Object.keys(rules).length <= 0) return this.handleIsValid(true);
			// 获取验证规则及参数
			let ruleType = "", args = [];
			// 过滤验证规则及参数	
			if (validType instanceof Array) {
				// 如果类型是Array
				ruleType = validProps[0] || "";
				args = validType.slice(1) || [];
			} else if (validType instanceof Object) { 
				// 如果类型是Object
				ruleType = validType[type] || "";
				const others = Object.assign({}, validType);
				delete others[type];
				args = Object.keys(others).length > 0 ? others : [];
			} else if (typeof validType === "string") {
				// 如果类型是String
				ruleType = validType;
			}
			// 判断ruleType 是否是符合要求的字符串，且是否有匹配上的规则
			if (typeof ruleType !== "string" || ruleType === "" || !rules[ruleType]) return this.handleIsValid(true);
			// 匹配上进行验证
			const [validator, message] = rules[ruleType];
			isValid = (typeof validator === "function" && validator(val, ...args))
				? this.setState({isValid})
				: this.setState({messageInline: message, isValid}, this.showHint);
		 	return isValid;
		}
		// 显示验证提示信息
		showHint() {
			const {isValid, messageInline} = this.state, {hint, validInline} = this.state.validProps;
			if (isValid) return;
			// 验证不通过, 该项标红显示
			console.log("爆红", Input);
			// 判断是行内验证还是form提交验证
			if (validInline) {
				// 行内验证提示 详细信息
				const msg = messageInline ? messageInline : hint;
				console.log("errInline", msg);
			} else {
				// form提交验证 提示hint内容
				console.log("errForm", hint);
			}
		}
		// 记录是否通过验证
		handleIsValid(isValid) {
			this.setState({isValid});
			return isValid;
		}
		// 获取当前验证元素
		getTarget(target) {
			this.target = target;
		}

		render() {
			const {validProps, validation, isValid, messageInline} = this.state;
			const validateHOC = Object.assign({}, validProps, validation, {isValid, messageInline});
			return <Input {...this.props} validateHOC={validateHOC} getTarget={this.getTarget.bind(this)} />
		}
	};

export default ValidateHoc;