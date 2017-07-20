import React from 'react';
import Page from '../../Page/index';
import {
	Input,
	Radio,
	Checkbox,
	Select,
	Switch,
	Agreement,
	Textarea,
	VCode
} from '../../Form/index';
import {
	Cells,
	CellsTitle,
	Cell,
	CellLabel,
	CellControl,
	CellArrow,
	CellClear,
	CellTip,
	CellContent,
	CellExtra
} from '../../Cell/index';

class InputPage extends React.Component {
	render() {
		return (
			<Page title="Input" subTitle="表单输入">
			<form action="">
				{/*================  radio  =================*/}
				<Cells>
					<CellsTitle>Radio</CellsTitle>
					<Cell htmlFor>
						<CellContent>Option 1</CellContent>
						<Radio name="radio1" value="1" defaultChecked></Radio>
					</Cell>
					<Cell htmlFor>
						<CellContent>Option 2</CellContent>
						<Radio name="radio1" value="2"></Radio>
					</Cell>
					<Cell htmlFor>
						<CellContent>Option 3</CellContent>
						<Radio name="radio1" value="3" disabled></Radio>
					</Cell>
					<Cell link>
						<CellContent>More</CellContent>
					</Cell>
				</Cells>
				{/*================  radio-inline  =================*/}
				<Cells>
					<CellsTitle>Radio-inline</CellsTitle>
					<Cell>
						<CellLabel>性别</CellLabel>
						<Radio name="sex" value="1" defaultChecked inline>男</Radio>
						<Radio name="sex" value="0" inline>女</Radio>
						<Radio name="sex" value="2" disabled inline>其他</Radio>
					</Cell>				
				</Cells>
				{/*================  checkbox  =================*/}
				<Cells>
					<CellsTitle>Checkbox</CellsTitle>
					<Cell htmlFor>
						<CellContent>Option 1</CellContent>
						<Checkbox name="Checkbox1" value="1"></Checkbox>
					</Cell>
					<Cell htmlFor>
						<CellContent>Option 2</CellContent>
						<Checkbox name="Checkbox2" value="2" disabled defaultChecked></Checkbox>
					</Cell>
					<Cell htmlFor>
						<CellContent>Option 3</CellContent>
						<Checkbox name="Checkbox3" value="3" defaultChecked></Checkbox>
					</Cell>
					<Cell htmlFor>
						<CellContent>Option 4</CellContent>
						<Checkbox name="Checkbox4" value="4" disabled></Checkbox>
					</Cell>
					<Cell link>
						<CellContent>More</CellContent>
					</Cell>
				</Cells>
				{/*================  checkbox-inline  =================*/}
				<Cells>
					<CellsTitle>Checkbox-inline</CellsTitle>
					<Cell>
						<CellLabel>汽车</CellLabel>
						<Checkbox name="car1" value="1" defaultChecked disabled inline>奔驰</Checkbox>
						<Checkbox name="car2" value="0" inline>宝马</Checkbox>
						<Checkbox name="car3" value="2" inline>奥迪</Checkbox>
					</Cell>				
				</Cells>
				{/*================  checkbox-inline  =================*/}
				<Cells>
					<CellsTitle>Switch</CellsTitle>
					<Cell>
						<CellContent>Switch Label</CellContent>
						<Switch name="switch" value="switch" defaultChecked/>
					</Cell>
				</Cells>
				<input type="submit" value="submit" height="20" width="50"/>
			</form>
			</Page>
		);
	}
};

export default InputPage;