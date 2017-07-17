import React, {Component} from 'react' 
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from 'react-router'

import UIroot from '../views/UIroot';
import Layout from '../layout/Example/index';
import App from '../containers/App';

const {
	Home,
	Button,
	Navbar
} = Layout;

export default class Routers extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={UIroot}>
				    <IndexRedirect to="/home" />
    		        <Route path="home" component={Home} />
    		        <Route path="button" component={Button} />
    		        <Route path="navbar" component={Navbar} />
    			</Route>
			</Router>
		);
	}
};
