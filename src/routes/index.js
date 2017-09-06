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
	AndtHome,
	AndtTable0,
	AndtTable1,
	AndtTable2,
	AndtTable3,
	AndtTable4,
	AndtTable5,
	AndtTable6,
	AndtTable7,
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
    		        <Route path="andt/home" component={AndtHome} />
    		        <Route path="andt/table/0" component={AndtTable0} />
    		        <Route path="andt/table/1" component={AndtTable1} />
    		        <Route path="andt/table/2" component={AndtTable2} />
    		        <Route path="andt/table/3" component={AndtTable3} />
    		        <Route path="andt/table/4" component={AndtTable4} />
    		        <Route path="andt/table/5" component={AndtTable5} />
    		        <Route path="andt/table/6" component={AndtTable6} />
    		        <Route path="andt/table/7" component={AndtTable7} />
    		    </Route>
			</Router>
		); 
	}
};
