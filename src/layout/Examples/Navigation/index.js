import React, {Component} from 'react';
import Page from '../../Page/index';
import Navigation from '../../Navigation/index';

class NavigationPage extends Component{
	render() {
		return (
			<Navigation 
				title="Navigation"
				rightContent="cancel"
				rightClick={() => console.log('rightClick')}
				leftClick={() => console.log('leftClick')}
			/>		
		);
	}
};

export default NavigationPage;