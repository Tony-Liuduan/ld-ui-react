import React from 'react';
import './flex.scss';

const Flex = (props) => (
	<div className="ui-flex" {...props}>
		{props.children}
	</div>
);

export default Flex;