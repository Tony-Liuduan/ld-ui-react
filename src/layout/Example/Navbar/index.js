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
			<Tab>
				<NavBar>
					<NavBarItem onClick={index => console.log(index)}>Nav1</NavBarItem>
					<NavBarItem onClick={index => console.log(index)}>Nav2</NavBarItem>
					<NavBarItem onClick={index => console.log(index)}>Nav3</NavBarItem>
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