import React, {Component} from 'react';
import Page from '../../Page/index';
import {
	Tab,
    TabBar,
    TabBarItem,
    TabBody,
	TabBodyItem
} from '../../Tab/index';

import IconHome from './imgs/icon-home.png';
import IconMine from './imgs/icon-mine.png';
import IconMore from './imgs/icon-more.png';

import IconHomeSelected from './imgs/icon-home-selected.png';
import IconMineSelected from './imgs/icon-mine-selected.png';
import IconMoreSelected from './imgs/icon-more-selected.png';

class TabBarPage extends Component{

	toggleTab(index) {
		console.log(index);
	}

	render() {
		return (
			<Tab onSelect={(index) => this.toggleTab(index)}>
				<TabBody>
					<TabBodyItem>Tab1content</TabBodyItem>
					<TabBodyItem>Tab2content</TabBodyItem>
					<TabBodyItem>Tab3content</TabBodyItem>
				</TabBody>
				<TabBar>
					<TabBarItem icon={IconHome} activeIcon={IconHomeSelected} label="主页" />
					<TabBarItem icon={IconMine} activeIcon={IconMineSelected} label="我的" />
					<TabBarItem icon={IconMore} activeIcon={IconMoreSelected} label="更多" />
				</TabBar>
			</Tab>
		);
	}
};

export default TabBarPage;