import React from 'react';
import {Link} from 'react-router';
import Page from '../../Page/index';
import {Button, ButtonArea} from '../../Button/index';

const ButtonPage = (props) => {
	return (
		<Page
			className="button"
			title="Button"
			subTitle="Button Components"
			spacing
		>
			<Button size="large">Large Default</Button>
			<Button size="large" type="white-orange">white-orange</Button>
			<Button size="large" type="orange-white">orange-white</Button>
			<Button size="large" type="white-blue">white-blue</Button>
			<Button size="large" type="blue-white">blue-white</Button>
			<Button size="large" disabled>Disabled</Button>
			
			<div className="btngroup">
				<Button type="white-orange">Normal</Button>	
				<Button type="white-blue">Normal</Button>	
				<Button disabled>Normal</Button>
			</div>
			
			<div className="btngroup">
				<Button size="small" type="orange-white">Small</Button>
				<Button size="small" type="blue-white">Small</Button>
				<Button size="small" disabled>Small</Button>
			</div>
						
			<ButtonArea>
				<Button>Area-Row1</Button>
				<Button>Area-Row2</Button>
			</ButtonArea>

			<ButtonArea>
				<Button type="orange-white">Row1</Button>
				<Button type="white-blue">Row2</Button>
				<Button disabled>Row3</Button>
			</ButtonArea>
			
			<ButtonArea direction="column">
				<Button type="orange-white">Area-Column1</Button>
				<Button type="white-blue">Area-Column2</Button>
			</ButtonArea>

		</Page>
	);
};

export default ButtonPage;