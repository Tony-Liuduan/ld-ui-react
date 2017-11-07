/**
 * Created by liuduan<liuduan.05.05@163.com>.
 * ComponentName Smscode
 * Desc 发送验证码倒计时组件]
 * GroupName lm-component
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import './smscode.scss';

/**
 * @class Smscode
 * @extends React.Component
 * @desc Smscode Component for mobile
 */
export default class Smscode extends Component {

	static propTypes = {
		prefixCls: PropTypes.string,
		className: PropTypes.string,
		second: PropTypes.number,
		disabled: PropTypes.bool,
		reset: PropTypes.bool,
		suffixText: PropTypes.oneOfType([
			PropTypes.string, PropTypes.element
		]),
		children: PropTypes.oneOfType([
			PropTypes.string, PropTypes.element
		]),
		onClick: PropTypes.func,
		onCountDownEnd: PropTypes.func
	};

	static defaultProps = {
		prefixCls: 'ld-smscode',                       // 类名前缀
		className: '',                                  // 自定义类名
		second: 60,                                     // 倒计时时长  
		disabled: false,                                // 是否禁用按钮       
		reset: false,                                   // 是否重置状态      
		suffixText: '秒',                               // 单位及后缀文本
		children: '获取验证码',                          // 倒数前显示文本                       
		onClick: () => { console.log('onClick') },     // 点击按钮回调函数
		onCountDownEnd: arg => { console.log(arg) }    // 倒计时结束后回调函数
	};

	constructor(props) {
		super(props);

		this.state = {
			second: this.props.second,                  // 倒计时秒
			disabled: this.props.disabled               // 是否禁用按钮 true-计时过程中禁用， false-计时结束停止禁用
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
	}

	_timer; // 计时器
	_hiddenSecond = 0; // 视口消失时显示的计时数
	_hiddenTime = 0;   // 视口消失、显示时间搓

	componentWillReceiveProps(nextProps) {
		if ('reset' in nextProps && nextProps.reset) {
			// 清除计时器
			if (this._timer) this._timer = clearInterval(this._timer);
			/* reset === true => disabled === this.props.disabled */
			this.setState({
				second: this.props.second,
				disabled: this.props.disabled
			})
		}
	}

	componentDidUpdate() {
		// 业务组件禁用时不监听
		if (this.props.disabled) return;
		// 当组件开启倒计时监听
		this.state.disabled && document.addEventListener("visibilitychange", this.handleVisibilityChange);
	}

	componentWillUnmount() {
		// 清除计时器
		if (this._timer) this._timer = clearInterval(this._timer);
	}

	/* 开启倒计时 */
	handleClick() {
		// 禁用按钮
		this.props.second >= 0 && this.setState({ disabled: true }, () => {
			// 先执行业务组件的onClick
			this.props.onClick()
			// 执行倒计时函数
			this._countDown();
		});
	}

	/* 监听页面显示、隐藏函数 */
	handleVisibilityChange() {
		// 页面'隐藏'、'显示'时间间隔
		let overTime = 0;
		// 根据页面'隐藏'、'显示'处理业务
		switch (document.visibilityState) {

			// 页面隐藏
			case 'hidden':
				// 缓存页面隐藏瞬间时间搓
				this._hiddenTime = new Date().getTime();
				// 缓存页面隐藏瞬间显示秒数
				this._hiddenSecond = this.state.second;
				// 清除计时器
				if (this._timer) this._timer = clearInterval(this._timer);
				break;

			// 页面显示
			case 'visible':
				// 记录页面消失过程时间差值
				overTime = new Date().getTime() - this._hiddenTime;
				// 转换为整数秒
				overTime = parseInt(overTime / 1000, 0);
				// overTime不超过剩余时间-更新计时时间
				if (overTime < this._hiddenSecond) {
					this.setState({ second: this._hiddenSecond - overTime }, () => {
						// 重新开启倒计时
						this._countDown();
					});
				} else {
					// 否则做计时结束处理
					this.setState({ second: this.props.second, disabled: false }, () => {
						this.props.onCountDownEnd(true)
					});
				}
				break;

			default:
				break;
		}
	}

	render() {
		const {
            prefixCls,
			className,
			second,
			disabled,
			reset,
			suffixText,
			onClick,
			onCountDownEnd,
			children,
			...others
        } = this.props;

		const cls = classNames(prefixCls, className);

		let content;  // 倒计时按钮示内容
		// props disabled === true || 'disabled' 或者 重置reset === true，显示：初始文本children
		if (disabled || disabled === 'disabled') {
			content = children;
		} else {
			// state disabled === true，显示：读秒
			if (this.state.disabled) {
				content = `${this.state.second}${suffixText}`;
			} else {
				content = children;
			}
		}

		return (
			<button
				className={cls}
				type="button"
				onClick={this.handleClick}
				disabled={this.state.disabled}
				{...others}>
				{content}
			</button>
		);
	}

	/* 倒计时函数 */
	_countDown() {
		if (this._timer) this._timer = clearInterval(this._timer);

		let secondUpate = this.state.second;
		let timeout = this.props.second > 0 ? 1000 : 200;
		// console.time()
		this._timer = setInterval(() => {
			if (secondUpate <= 1) {
				this._timer = clearInterval(this._timer);
				this.setState({ second: this.props.second, disabled: false }, () => {
					// console.timeEnd()
					this.props.onCountDownEnd(true)
				});
				return;
			} else {
				--secondUpate;
				this.setState({ second: secondUpate });
			}
		}, timeout);
	}
}