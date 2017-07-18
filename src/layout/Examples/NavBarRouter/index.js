import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Page from '../../Page/index';
import {
	Tab,
    NavBar,
    NavBarItem,
    TabBody,
	TabBodyItem
} from '../../Tab/index';

class NavBarRouterPage extends Component{

	static contextTypes = {
		router: PropTypes.object
	}

	componentDidMount() {
		const {tabIndex} = this.props.params;
		this.context.router.replace(`/navbar/router/${tabIndex || 0}`)
	}
	
	toggleTab(index) {
		this.context.router.replace(`/navbar/router/${index}`);
	}

	render() {
		return (
			<Tab onSelect={(index) => this.toggleTab(index)} currentIndex={this.props.params.tabIndex - 0} type="navbar-router">
				<NavBar>
					<NavBarItem>Nav1</NavBarItem>
					<NavBarItem>Nav2</NavBarItem>
					<NavBarItem>Nav3</NavBarItem>
				</NavBar>
				<TabBody>
					{this.props.children}
				</TabBody>
			</Tab>
		);
	}
};

export default NavBarRouterPage;