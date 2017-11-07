import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './mask.scss';
// 遮罩层
const Mask = (props) => {
	const {transparent, className, ...other} = props;
	const cls = classNames({
		'ui-mask': true,
		'ui-mask-transparent': transparent
	}, className);

	return (
		<div className={cls} {...other}></div>
	);
};

Mask.propTypes = {
	transparent: PropTypes.bool
};

Mask.defaultPorps = {
	transparent: false // Whather mask should be transparent (no color)
}; 

export default Mask;