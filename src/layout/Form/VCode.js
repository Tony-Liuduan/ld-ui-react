import React from 'react';
import classNames from 'classnames';

import './form.scss';

// 验证码组件
const VCode = (props) => {
	const {className, children, ...other} = props;
	const cls = classNames({
		'ui-vcode': true
	}, className);

	return (
		<div className={cls}>
			<button type="button" {...other}>{children}</button>
		</div>
	);
};

export default VCode;