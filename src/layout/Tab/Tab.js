import React, {Component, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavBar from './NavBar';
import TabBody from './TabBody';
import TabBar from './TabBar';

class Tab extends Component {

	static propTypes = {
		currentIndex: PropTypes.number,
		onSelect: PropTypes.func,
		type: PropTypes.string
	};

	static defaultProps = {
		currentIndex: 0,
		type: "tabbar" // navbar  navbar-router  tabbar
	};

	constructor(props) {
		super(props);
		this.state = {
			currentIndex: this.props.currentIndex
		}
	}
	
	// 点击tab事件
	handleHeaderClick(e, index) {	
		const {onSelect} = this.props;

        'function' === typeof onSelect 
        	? this.setState({currentIndex: index}, () => onSelect(index)) 
        	: this.setState({currentIndex: index});
	}
	
	// 重写navbar tabbody中子组件
	resetChildren(children) {
		const result = Children.map(children, (child, index) => {
					if (!child) return;	
					return cloneElement(child, Object.assign({}, child.props, {
						key: index,
						active: this.state.currentIndex == index,
						onClick: (e) => this.handleHeaderClick(e, index),
					}));
				});
		return result;
	}
	
	// 拆分children为 header body 两部分
	parseChildren(type, children) {
		let ChildHeader = [], ChildBody = [];

		Children.map(children, child => {
			if (!child) return;	
			
			if (child.type === NavBar || child.type === TabBar) {
				ChildHeader = this.resetChildren(child.props.children);
			} else if (child.type === TabBody) {
				type === "navbar-router" 
					? ChildBody = child.props.children
					: ChildBody = this.resetChildren(child.props.children);
			}
		});

		return {ChildHeader, ChildBody};
	}

	renderTab(type, children, cls, other) {
		const {ChildHeader, ChildBody} = this.parseChildren(type, children);
		
		if (type === 'tabbar') {
			return (
				<div className={cls} {...other}>
					<TabBody>
						{ChildBody}
					</TabBody>
					<TabBar>
						{ChildHeader}
					</TabBar>
				</div>
			);
		} else if (type === 'navbar' || type === 'navbar-router') {
			return (
				<div className={cls} {...other}>
					<NavBar>
						{ChildHeader}
					</NavBar>
					<TabBody>
						{ChildBody}
					</TabBody>
				</div>
			);
		} else {
			return false;
		}
	}

	render() {
		const {type, currentIndex, children, className, ...other} = this.props;
		const cls = classNames({
			'ui-tab': true
		}, className);

		return this.renderTab(type, children, cls, other);
	}
};

export default Tab;