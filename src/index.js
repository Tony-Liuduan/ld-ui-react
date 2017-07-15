import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routes';
import './app.scss';

ReactDOM.render(    
	<Routers />
	,document.getElementById('root')
);
