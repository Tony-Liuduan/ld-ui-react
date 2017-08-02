import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import Routers from './routes';

// window.addEventListener('load', () => {
//   FastClick.attach(document.body);
// });

ReactDOM.render(    
	<Routers />
	,document.getElementById('root')
);
