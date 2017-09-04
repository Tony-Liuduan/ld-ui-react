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
	AndtHome
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
    		        <Route path="andt" component={AndtHome}> 
    		        </Route>         		
    		    </Route>
			</Router>
		); 
	}
};
