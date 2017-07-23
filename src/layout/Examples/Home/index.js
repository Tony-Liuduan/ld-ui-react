import React from 'react';
import { Link } from 'react-router';

import Page from '../../Page/index';
import Accordion from '../../Accordion/index';
import {Flex, FlexItem} from '../../Flex/index';
import {Cells, Cell, CellContent, CellArrow} from '../../Cell/index';

import './home.scss';

const UImenus = [
    {
        name: 'Form',
        items: [
            {
                label: 'Button',
                to: '/button'
            },
            {
                label: 'List',
                to: '/list'
            },
            {
                label: 'Input',
                to: '/input'
            },
            {
                label: 'Picker',
                to: '/picker'
            },
            {
                label: 'Slider',
                to: '/slider'
            },
            {
                label: 'Uploader',
                to: '/uploader'
            }
        ]
    },
    {
        name: 'Basic Components',
        items: [
            {
                label: 'Article',
                to: '/article'
            },
            {
                label: 'Badge',
                to: '/badge'
            },
            {
                label: 'Flex',
                to: '/flex'
            },
            {
                label: 'Footer',
                to: '/footer'
            },
            {
                label: 'Gallery',
                to: '/gallery'
            },
            {
                label: 'Grid',
                to: '/grid'
            },
            {
                label: 'Icons',
                to: '/icons'
            },
            {
                label: 'Loadmore',
                to: '/loadmore'
            },
            {
                label: 'Panel',
                to: '/panel'
            },
            {
                label: 'Preview',
                to: '/preview'
            },
            {
                label: 'Progress',
                to: '/progress'
            }
        ]
    },
    {
        name: 'Feedbacks',
        items: [
            {
                label: 'Actionsheet',
                to: '/actionsheet'
            },
            {
                label: 'Dialog',
                to: '/dialog'
            },
            {
                label: 'Msg',
                to: '/msg'
            },
            {
                label: 'Toast',
                to: '/toast'
            },
            {
                label: 'Toptips',
                to: '/toptips'
            },
            {
                label: 'Popup',
                to: '/popup'
            },
            {
                label: 'Pull To Refresh',
                to: '/ptr'
            },
            {
                label: 'Infinite Loader',
                to: '/infinite'
            }
        ]
    },
    {
        name: 'Navigations',
        items: [
            {
                label: 'NavBar',
                to: '/navbar'
            },
            {
                label: 'NavBarRouter',
                to: '/navbar/router'
            },
            {
                label: 'TabBar',
                to: '/tabbar'
            },{
                label: 'Navigation',
                to: '/navigation'
            }
        ]
    },
    {
        name: 'Search',
        items: [
            {
                label: 'Search Bar',
                to: '/searchbar'
            }
        ]
    }
];

const Home = (props) => {
	return (
		<Page
			className="home"
			title="UI Library"
			subTitle="A UI library, includes the most useful widgets/modules in mobile web applications."
			spacing
		>
			<ul>
				{UImenus.map((menu, i) => ( 
					<li key={i}>
						<Accordion
                            header={
                                <Flex>
                                    <FlexItem component="p">
                                        {menu.name}
                                    </FlexItem>
                                </Flex>
                            }
                        >
                            <Cells>
                                {menu.items.map((item, j) => (
                                    <Cell key={j} component={Link} to={item.to}>
                                        <CellContent>
                                            {item.label}
                                        </CellContent>
                                        <CellArrow />
                                    </Cell>
                                ))}                           
                            </Cells>
                        </Accordion>
					</li>
				))}
			</ul>
		</Page>
	);
};

export default Home;