import React from 'react';
import Accordion from '../components/Accordion/Accordion.js';
class App extends React.Component {

	constructor(props) {

	    super(props)

	}

	render() {

		return (

			<div>
		        <Accordion title="Accordion Title Here" />
			</div>

		)

	}	

}

export default App