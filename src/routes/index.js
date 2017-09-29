import React, {Component} from 'react' 
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from 'react-router'

import UIroot from '../views/UIroot';
import Layout from '../layout/Examples/index';
import Andt from '../andt/index';

const {
	Home,
	Button,
	NavBar,
	NavBarRouter,
	TabBar,
	Navigation,
	List,
	Input,
	Picker,
	Hoc
} = Layout;

const {
	AndtLayout0,
	AndtLayout1,
	AndtTable0,
	AndtTable1,
	AndtTable2,
	AndtTable3,
	AndtTable4,
	AndtTable5,
	AndtTable6,
	AndtTable7,
	AndtCascader,
	AndtForm0,
	AndtForm1,
	AndtForm2,
} = Andt;

export default class Routers extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={UIroot}>
				    <IndexRedirect to="/home" />
    		        <Route path="home" component={Home} />
    		        <Route path="button" component={Button} />
    		        <Route path="navbar" component={NavBar} />
    		        <Route path="navbar/router" component={NavBarRouter}>
    		        	<IndexRoute component={Button} />
    		        	<Route path="/navbar/router/:tabIndex" component={Button}></Route>    		
    		        </Route>
    		        <Route path="tabbar" component={TabBar} />
    		        <Route path="navigation" component={Navigation} /> 
    		        <Route path="list" component={List} />
    		        <Route path="input" component={Input} />
    		        <Route path="picker" component={Picker} />

					
					{/* ===============  andt  ================ */}
{/*     		        <Route path="andt/layout/0" component={AndtLayout0} />
    		        <Route path="andt/layout/1" component={AndtLayout1} />
    		        <Route path="andt/table/0" component={AndtTable0} />
    		        <Route path="andt/table/1" component={AndtTable1} />
    		        <Route path="andt/table/2" component={AndtTable2} />
    		        <Route path="andt/table/3" component={AndtTable3} />
    		        <Route path="andt/table/4" component={AndtTable4} />
    		        <Route path="andt/table/5" component={AndtTable5} />
    		        <Route path="andt/table/6" component={AndtTable6} />
    		        <Route path="andt/table/7" component={AndtTable7} />
    		        <Route path="andt/cascader" component={AndtCascader} />
    		        <Route path="andt/form/0" component={AndtForm0} />
    		        <Route path="andt/form/1" component={AndtForm1} />
    		        <Route path="andt/form/2" component={AndtForm2} /> */}
    		    </Route>
			</Router>
		); 
	}
};
