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
		second: 6,
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

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	handleClick(e) {
		if (this.state.sendOver) this.setState({sendOver: false}, e => this.countDown(e));	
	}

	countDown(e) {
		const {sendOver, second} = this.state;
		let secondUpate = this.props.second;
		// 倒计时
		this.timer = setInterval(() => {
			if (secondUpate <= 1) {
				clearInterval(this.timer);
				this.setState({sendOver: true, second: this.props.second});
				if (this.props.onClick) this.props.onClick(e); 
				return;
			}
			--secondUpate;
			this.setState({second: secondUpate});
		}, 1000);
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