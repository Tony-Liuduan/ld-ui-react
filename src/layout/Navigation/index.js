import React, {PropTypes} from 'react';
import classNames from 'classnames';

import {CellArrow} from '../Cell/index';
import './navigation.scss';

// 顶部导航栏
const Navigation = (props) => {

	const {title, left, right, leftClick, rightClick, leftContent, rightContent, className, ...other} = props;
	const cls = classNames('ui-navigation', className);

	return (
		<div className={cls} {...other}>
			{left ? <div className="ui-navigation-left" onClick={e => leftClick(e)}>{leftContent}</div> : false}			
			<p className="ui-navigation-title">{title}</p>
			{right ? <div className="ui-navigation-right" onClick={e => rightClick(e)}>{rightContent}</div> : false}
		</div>

	);
};

Navigation.propTypes = {
	title: PropTypes.string,
	left: PropTypes.bool,
	right: PropTypes.bool,
	leftClick: PropTypes.func,
	rightClick: PropTypes.func
}

Navigation.defaultProps = {
	title: '',
	left: true,
	right: true,
	leftContent: <CellArrow direction="left" />,
	rightContent: '取消',
	leftClick: () => {
		window.history.go(-1);
	}
}

export default Navigation;