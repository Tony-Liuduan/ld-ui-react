import React, {Component, PropTypes, Children} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {event, observer} from '../Base/Js/utils';
import Input from './Input';
import Checkbox from './Checkbox';

// observer 配置
const config = {childList: true, subtree: true, attributes: false, characterData: false};

class Form extends Component {
	
	static propTypes = {
		btnIsEnabled: PropTypes.bool
	};

	static defaultProps = {
	};	

	constructor(props) {
		super(props);
		this.validCount = 0;
		this.observer = observer(this.emitValidSize.bind(this));
	}

	componentDidMount() {
		this.emitValidSize();		
	}

	componentDidUpdate(prevProps, prevState) {
		// 观察form dom树变化
		// this.observer.observe(ReactDOM.findDOMNode(this), config);
	}
	// 发送validate数量
	emitValidSize() {
		Children.map(this.props.children, this.findValidSize);
		event.emit('validsize', this.validCount);
	}
	// 递归查找Input validate
	findValidSize = (child, index) => {
		if (!child) return;	
		if (child.type === Input || child.type === Checkbox) {
			const {required, validate} = child.props;
			if (!!required || Object.keys(validate).length > 0) {
				this.validCount++
			}
		} else if (child.props.children && typeof child.props.children === 'object'){
			Children.map(child.props.children, this.findValidSize);
		} 
	}

	render() {
		const {className, children, ...other} = this.props;
		const cls = classNames('ui-form', className);
		return <form className={cls} {...other}> {children} </form>
	}
}

export default Form;