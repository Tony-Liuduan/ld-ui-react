import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {Cells, Cell, CellArrow, CellContent, FormCell} from '../Cell/index';
import Mask from '../Mask/index';
import Navigation from '../Navigation/index';

import './picker.scss';
import '../Base/Css/animate.scss';

class Picker extends Component {
	
	static propTypes = {
		index: PropTypes.number,
		show: PropTypes.bool,
		data: PropTypes.array,
	};

	static defaultProps = {
		index: 0,
		show: false,
		data: [],
	};

	constructor(props) {
		super(props);
		this.state = {
			close: false,
			selectedValue: ''
		};
	}

	componentDidUpdate() {

	}

	handleClose(cb, direction='right') {
		// 首个picker || 按左箭头 显示动画
		if (this.props.index === 0 || direction == 'left') {
			this.setState({
				close: true
			}, () => setTimeout(() => {
				this.setState({
					close: false
				});
				if (cb) cb();
			}, 300));
		} else if (cb) {
			cb();
		}
	}

	handleSelectItem(e, cb) {
		this.setState({selectedValue: JSON.parse(e.target.value).code});
		if (cb) cb();
	}

	renderNavigation(option) {
		return  <Navigation
					title={option.title}
					left={option.left}
					leftClick={option.leftClick}
					rightClick={option.rightClick}
					rightContent={option.rightContent}
				/>;
	}

	renderPickerBody(data, onSelect, cb, selectCity) {
		return data.map((item, index) => {
			const selectCls = classNames({'ui-picker-selected': selectCity ? selectCity === item.code : this.state.selectedValue === item.code});
			return (		
				<FormCell radio key={index} className={selectCls} onClick={(e) => this.handleSelectItem(e, () => onSelect(item, cb))}>
					<CellContent>
						<input type="radio" readOnly value={JSON.stringify(item)} />
						{item.label}
					</CellContent>
				</FormCell>
			);
		});
	}

	render() {
		const {index, show, onShow, onHide, onCancel, onSelect, data, selectCitys, className, ...other} = this.props;
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
		const Navgroup = [{
						title: '选择省',
						left: false,
						rightClick: () => this.handleClose(onCancel),
						rightContent: '取消'
					},{
						title: '选择市',
						left: true,
						leftClick: () => this.handleClose(onHide, 'left'),
						rightClick: () => this.handleClose(onCancel),
						rightContent: '取消'
					},{
						title: '选择区/县',
						left: true,
						leftClick: () => this.handleClose(onHide, 'left'),
						rightClick: () => this.handleClose(onCancel),
						rightContent: '取消'
					}];
		const transparent = index === 0 ? false : true;
		console.log(selectCitys[index]);
		return show ? (
			<div>
				<Mask className={maskCls} transparent={transparent} onClick={this.handleClose.bind(this, onCancel)}/>
				<div className={cls} {...other}>
					{this.renderNavigation(Navgroup[index])}
					<div className="ui-picker-body" ref="">
						{
							index == Navgroup.length-1 
								? this.renderPickerBody(data, onSelect, onCancel, selectCitys[index])
								: this.renderPickerBody(data, onSelect, onShow, selectCitys[index]) 
						}
					</div>
				</div>
			</div>
		) : false;

	}
};

export default Picker;