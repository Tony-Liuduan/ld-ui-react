import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import './form.scss';

// 验证码组件
class VCode extends Component {

	static propTypes = {
		second: PropTypes.number,
		suffixText: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		second: 60,
		suffixText: "秒",
		onClick: () => {console.log('click')}
	};

	constructor(props) {
		super(props);
		this.state = {
			second: this.props.second,
			sendOver: true // 标识 send 完毕状态
		}
	}

	handleClick(e) {
		this.setState({sendOver: !this.state.sendOver}, this.countDown);	
	}

	countDown() {
		const {sendOver, second} = this.state, me = this;
		let secondUpate = this.props.second;		
		// 判断是否发送结束
		if (sendOver) {
			if (this.props.onClick) this.props.onClick(e); 
			return;
		};
		// 倒计时
		(function timer() {
			if (secondUpate <= 0) {
				clearInterval(timer);
				me.setState({sendOver: true, second: me.props.second});
				return;
			}
			--secondUpate;
			me.setState({second: secondUpate});
			setTimeout(timer, 1000);
		})();
	}

	render() {
		const {className, children, second, suffixText, onClick, ...other} = this.props;
		const cls = classNames({
			'ui-vcode': true,
			'ui-vcode-countDown': !this.state.sendOver
		}, className);
		const VcodeContent = this.state.sendOver ? children : `${this.state.second}${suffixText}`;
		return (
			<div className={cls} onClick={this.handleClick.bind(this)} {...other}>
				<button type="button" disabled={!this.state.sendOver}>{VcodeContent}</button>
			</div>
		);
	}
};

export default VCode;