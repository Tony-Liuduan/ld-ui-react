import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ValidateHoc from './ValidateHoc';
import {event} from '../Base/Js/utils';

import './form.scss';
// 不要单独使用checked value，使用checked value就必须伴随onChange事件  === 受控组件
// disabled  
// 可单独使用defaultValue defaultChecked 这样的是不受控组件
class Radio extends Component {

	static propTypes = {
		inline: PropTypes.bool,
		component: PropTypes.func
	};

	static defaultProps = {
		inline: false
	};

	static contextTypes = {
		requiredGroup: PropTypes.bool,
		emitName: PropTypes.string
	};	

	componentDidMount() {
		if (this.props.required || this.props.validate.required) {
			this.props.getTarget(this.radio);
		}
	}

	handleChange(e) {
		const {validateHOC} = this.props;
		// 自身 required
		validateHOC.required && validateHOC.handleChange(e);
		// group required 通知checkboxgroup 变化
		this.context.requiredGroup && event.emit(this.context.emitName, e.target, e.target.checked);
	}

	render() {
		const {component, className, inline, children, onChange, validate, validateHOC, getTarget, ...other} = this.props;
		const defaultComoponent = inline ? 'label' : 'div';
		const Component = component || defaultComoponent;
		const cls = classNames({
			'ui-inputcheck-label': inline,
			'ui-inputcheck-wrapper': !inline
		}, className);
		return (
			<Component className={cls}>
				<input type="radio" className="ui-inputcheck-input" ref={(ref) => {this.radio = ref;}} onChange={this.handleChange.bind(this)} {...other} />
				<span className="ui-inputcheck-icon">{children}</span>
			</Component>
		);
	}
};

export default ValidateHoc(Radio);