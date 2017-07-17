import React, {Component, PropTypes, Children, cloneElement} from 'react';
import classNames from 'classnames';
import NavBar from './NavBar';
import TabBody from './TabBody';

class Tab extends Component {

	static propTypes = {
		currentIndex: PropTypes.number
	};

	static defaultProps = {
		currentIndex: 0
	};

	constructor(props) {
		super(props);
		this.state = {
			currentIndex: this.props.currentIndex
		}
	}
	
	// 点击tab事件
	handleHeaderClick(e, prop, index) {	
		if (prop.onClick) {
			this.setState({currentIndex: index}, () => prop.onClick(index));
		} else {
			this.setState({currentIndex: index});
		}
	}
	
	// 重写navbar tabbody中子组件
	resetChildren(children) {
		const result = Children.map(children, (child, index) => {
					if (!child) return;	
					return cloneElement(child, Object.assign({}, child.props, {
						key: index,
						active: this.state.currentIndex == index,
						onClick: (e) => this.handleHeaderClick(e, child.props, index),
					}));
				});
		return result;
	}
	
	// 拆分children为 header body 两部分
	parseChildren(children) {
		let ChildHeader = [], ChildBody = [];

		Children.map(children, child => {
			if (!child) return;	
			
			if (child.type === NavBar) {
				ChildHeader = this.resetChildren(child.props.children);
			} else if (child.type === TabBody) {
				ChildBody = this.resetChildren(child.props.children);
			}
		});

		return {ChildHeader, ChildBody};
	}

	renderTab(children, cls, other) {
		const {ChildHeader, ChildBody} = this.parseChildren(children);
		return <div className={cls} {...other}>
					<NavBar>
						{ChildHeader}
					</NavBar>
					<TabBody>
						{ChildBody}
					</TabBody>
               </div>
	}

	render() {
		const {currentIndex, children, className, ...other} = this.props;
		const cls = classNames({
			'ui-tab': true
		}, className);

		return this.renderTab(children, cls, other);
	}
};

export default Tab;