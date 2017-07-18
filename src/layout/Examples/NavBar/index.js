import React, {Component} from 'react';
import Page from '../../Page/index';
import {
	Tab,
    NavBar,
    NavBarItem,
    TabBody,
	TabBodyItem
} from '../../Tab/index';

class NavBarPage extends Component{
	render() {
		return (
			<Tab type="navbar">
				<NavBar>
					<NavBarItem>Nav1</NavBarItem>
					<NavBarItem>Nav2</NavBarItem>
					<NavBarItem>Nav3</NavBarItem>
				</NavBar>
				<TabBody>
					<TabBodyItem>Nav1content</TabBodyItem>
					<TabBodyItem>Nav2content</TabBodyItem>
					<TabBodyItem>Nav3content</TabBodyItem>
				</TabBody>
			</Tab>
		);
	}
};

export default NavBarPage;