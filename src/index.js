import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, IndexRoute, Link, Route, Router, hashHistory } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import './app.css';
let rootElement = document.getElementById('root');

ReactDOM.render(
	    
		<App>
		</App>,
	rootElement

)
