import React, {Component} from 'react' 
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from 'react-router'

import UIroot from '../views/UIroot';
import Layout from '../layout/Examples/index';
import App from '../containers/App';

const {
	Home,
	Button,
	NavBar,
	NavBarRouter,
	TabBar,
	List
} = Layout;

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
    		        <Route path="list" component={List} />
       			</Route>
			</Router>
		); 
	}
};
