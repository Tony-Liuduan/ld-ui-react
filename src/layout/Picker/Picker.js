import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {Cells, Cell, CellArrow, CellContent} from '../Cell/index';
import Mask from '../Mask/index';
import Navigation from '../Navigation/index';

import './picker.scss';
import '../Base/Css/animate.scss';

class Picker extends Component {
	
	static propTypes = {
		show: PropTypes.bool,
		data: PropTypes.array,
	};

	static defaultProps = {
		show: false,
		data: [],

	};

	constructor(props) {
		super(props);
		this.state = {
			close: false
		}
	}

	handleClose(e) {
		this.setState({
			close: true
		}, () => setTimeout(() => {
			this.setState({
				close: false
			});
			if (this.props.onCancel) this.props.onCancel(e);
		}, 300));
	}

	renderPickerBody(data) {
		return data.map((item, index) => (
				<Cell key={index}>
					<CellContent onClick={e => console.log(item.label)}>{item.label}</CellContent>
				</Cell>
			));
	}

	render() {
		const {show, onCancel, data, className, children, ...other} = this.props;
		const {close} = this.state;

		const cls = classNames({
			'ui-picker': true,
			'ui-animate-slide-up': show && !close,
			'ui-animate-slide-down': close,
		}, className);
		const maskCls = classNames({
			'ui-animate-fade-in': show && !close,
			'ui-animate-fade-out': close
		});

		return show ? (
			<div>
				<Mask className={maskCls} onClick={this.handleClose.bind(this)}/>
				<div className={cls} {...other}>
					<Navigation
						title="选择市"
						left={false}
						rightContent="取消"
						rightClick={this.handleClose.bind(this)}
					/>
					<div className="ui-picker-body">
						{this.renderPickerBody(data)}
					</div>
				</div>
			</div>
		) : false;

	}
};

export default Picker;