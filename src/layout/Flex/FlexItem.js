import React from 'react';
import './flex.scss';

const FlexItem = (props) => {
	const { component, children, ...others } = props;
	return (
		<component className="ui-flex-item" {...others}>
			{children}
		</component>
	)
};

FlexItem.propTypes = {
     component: React.PropTypes.node
};

FlexItem.defaultProps = {
    component: 'div'
};


export default FlexItem;