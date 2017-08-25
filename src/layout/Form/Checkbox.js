import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ValidateHoc from './ValidateHoc';
import {event} from '../Base/Js/utils';

import './form.scss';
// 不要单独使用checked value，使用checked value就必须伴随onChange事件  === 受控组件
// disabled 
// readOnly 不生效， 如需readOnly 请使用 defaultChecked + disabled
// 可单独使用defaultValue defaultChecked 这样的是不受控组件
class Checkbox extends Component {

	static propTypes = {
		inline: PropTypes.bool,
		component: PropTypes.func
	};

	static defaultProps = {
		inline: false
	};

	componentDidMount() {
		this.props.getTarget(this.checkbox);
	}

	handleChange(e) {
		this.handleEmit(e.target, e.target.checked ? true : "");		
		if (this.props.onChange) this.props.onChange(e);
	}

	handleEmit(target, value) {
		if (this.props.validateHOC.required) event.emit('btnEnabeld', target, value);
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
				<input type="checkbox" className="ui-inputcheck-input" ref={(ref) => {this.checkbox = ref;}} onChange={this.handleChange.bind(this)} {...other} />
				<span className="ui-inputcheck-icon">{children}</span>
			</Component>
		);
	}
};

export default ValidateHoc(Checkbox);