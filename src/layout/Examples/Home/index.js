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
    }/* ,{
        name: 'Andt',
        items: [
            {
                label: 'AndtLayout0',
                to: '/andt/layout/0'
            },{
                label: 'AndtLayout1',
                to: '/andt/layout/1'
            },{
                label: 'table-fetch',
                to: '/andt/table/0'
            },{
                label: 'table-外控',
                to: '/andt/table/1'
            },{
                label: 'table-排序筛选',
                to: '/andt/table/2'
            },{
                label: 'table-checkbox',
                to: '/andt/table/3'
            },{
                label: 'table-fixed',
                to: '/andt/table/4'
            },{
                label: 'table-fixed-2',
                to: '/andt/table/7'
            },{
                label: 'table-add',
                to: '/andt/table/5'
            },{
                label: 'table-edit',
                to: '/andt/table/6'
            },{
                label: 'cascader',
                to: '/andt/cascader'
            },{
                label: 'form-search',
                to: '/andt/form/0'
            },{
                label: 'form-validate-status',
                to: '/andt/form/1'
            },{
                label: 'form-validate',
                to: '/andt/form/2'
            }
        ]
    } */
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