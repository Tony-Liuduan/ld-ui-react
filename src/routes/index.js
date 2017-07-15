import React, {Component} from 'react' 
import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from 'react-router'

import UIroot from '../views/UIroot';
import App from '../containers/App'
	
export default class Routers extends Component {
	render() {
		return (
				<Router history={browserHistory}>
					<Route path="/" component={UIroot}>
					    <IndexRedirect to="/app"/>
    			        <Route path="app" component={App} onEnter={() => console.log('进入首页')} onLeave={() => console.log('离开首页')}/>
    				</Route>
				</Router>
			)
	}
};
