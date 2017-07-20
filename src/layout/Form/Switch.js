import React from 'react';
import classNames from 'classnames';

import './form.scss';
// 不要单独使用checked value，使用checked value就必须伴随onChange事件  === 受控组件
// disabled 
// readOnly 不生效， 如需readOnly 请使用 defaultChecked + disabled
// 可单独使用defaultValue defaultChecked 这样的是不受控组件
const Switch = (props) => {

	const {className, children, ...other} = props;
	const cls = classNames({
		'ui-inputswitch': true,
	}, className);

	return (
		<div className={cls}>
			<input type="checkbox" className="ui-inputswitch-input" {...other} />
			<span className="ui-inputswitch-icon">{children}</span>
		</div>
	);
};

export default Switch;