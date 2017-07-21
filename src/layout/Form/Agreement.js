import React from 'react';
import classNames from 'classnames';

import './form.scss';

// agreement
const Agreement = (props) => {
	const {children, className, label, ...other} = props;
	const cls = classNames({'ui-agreement': true}, className);

	return (
		<div className={cls}>
			<label>
				<input type="checkbox" className="ui-agreement-checkbox" {...other} />
				<span className="ui-agreement-text">{label}</span>
			</label>
			{children}
		</div>
	);
};

export default Agreement;
