import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './form.scss';
// 不要单独使用checked value，使用checked value就必须伴随onChange事件  === 受控组件
// disabled 
// readOnly 不生效， 如需readOnly 请使用 defaultChecked + disabled
// 可单独使用defaultValue defaultChecked 这样的是不受控组件
const Checkbox = (props) => {

	const {component, className, inline, children, ...other} = props;
	const defaultComoponent = inline ? 'label' : 'div';
	const Component = component || defaultComoponent;
	const cls = classNames({
		'ui-inputcheck-label': inline,
		'ui-inputcheck-wrapper': !inline
	}, className);

	return (
		<Component className={cls}>
			<input type="checkbox" className="ui-inputcheck-input" {...other} />
			<span className="ui-inputcheck-icon">{children}</span>
		</Component>
	);
};

Checkbox.propTypes = {
	inline: PropTypes.bool,
	component: PropTypes.func
};

Checkbox.defaultProps = {
	inline: false
};

export default Checkbox;