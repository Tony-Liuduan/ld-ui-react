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
	CellExtra,
	FormCell
} from '../../Cell/index';

class InputPage extends React.Component {
	render() {
		return (
			<Page title="Input" subTitle="表单输入">
			<form action="">
				{/*================  radio  =================*/}
				<Cells>
					<CellsTitle>Radio</CellsTitle>
					<FormCell radio>
						<CellContent>Option 1</CellContent>
						<Radio name="radio1" value="1" defaultChecked></Radio>
					</FormCell>
					<FormCell radio>
						<CellContent>Option 2</CellContent>
						<Radio name="radio1" value="2"></Radio>
					</FormCell>
					<FormCell radio>
						<CellContent>Option 3</CellContent>
						<Radio name="radio1" value="3" disabled></Radio>
					</FormCell>
					<Cell link>
						<CellContent>More</CellContent>
					</Cell>
				</Cells>
				{/*================  radio-inline  =================*/}
				<Cells>
					<CellsTitle>Radio-inline</CellsTitle>
					<FormCell radioInline>
						<CellLabel>性别</CellLabel>
						<Radio name="sex" value="1" defaultChecked inline>男</Radio>
						<Radio name="sex" value="0" inline>女</Radio>
						<Radio name="sex" value="2" disabled inline>其他</Radio>
					</FormCell>	
				</Cells>
				{/*================  checkbox  =================*/}
				<Cells>
					<CellsTitle>Checkbox</CellsTitle>
					<FormCell checkbox>
						<CellContent>Option 1</CellContent>
						<Checkbox name="Checkbox1" value="1"></Checkbox>
					</FormCell>
					<FormCell checkbox>
						<CellContent>Option 2</CellContent>
						<Checkbox name="Checkbox2" value="2" disabled></Checkbox>
					</FormCell>
					<FormCell checkbox>
						<CellContent>Option 3</CellContent>
						<Checkbox name="Checkbox3" value="3" defaultChecked></Checkbox>
					</FormCell>
					<FormCell checkbox>
						<CellContent>Option 4</CellContent>
						<Checkbox name="Checkbox4" value="4"></Checkbox>
					</FormCell>
					<Cell link>
						<CellContent>More</CellContent>
					</Cell>
				</Cells>
				{/*================  checkbox-inline  =================*/}
				<Cells>
					<CellsTitle>Checkbox-inline</CellsTitle>
					<FormCell checkboxInline>
						<CellLabel>汽车</CellLabel>
						<Checkbox name="car1" value="0" disabled inline>奔驰</Checkbox>
						<Checkbox name="car2" value="1" inline>宝马</Checkbox>
						<Checkbox name="car3" value="2" inline>奥迪</Checkbox>
					</FormCell>				
				</Cells>
				{/*================  checkbox-inline  =================*/}
				<Cells>
					<CellsTitle>Switch</CellsTitle>
					<FormCell switch>
						<CellContent>Switch normal</CellContent>
						<Switch name="switch" value="switch"/>
					</FormCell>
					<FormCell switch>
						<CellContent>Switch defaultChecked</CellContent>
						<Switch name="switch defaultChecked" value="switch" defaultChecked/>
					</FormCell>
					<FormCell switch>
						<CellContent>Switch disabled</CellContent>
						<Switch name="switch disabled" value="switch" disabled/>
					</FormCell>
				</Cells>
				{/*================  checkbox-inline  =================*/}
				<Cells>
					<CellsTitle>Select</CellsTitle>
					<FormCell select selectPos="after">
						<CellLabel>Select after</CellLabel>
						<CellControl>
							<Select name="country" defaultValue="2">
								<option disabled>请选择经营地类型</option>
								<option value="1">集中交易市场</option>
								<option value="2">非集中交易市场</option>
							</Select>
							<CellArrow direction="bottom"></CellArrow>
						</CellControl>
					</FormCell>
					<FormCell select>
						<CellControl>
							<Select name="connect" defaultValue="1">
								<option value="0">QQ</option>
								<option value="1">Weixin</option>
								<option value="2">Sina</option>
							</Select>
							<CellArrow direction="bottom"></CellArrow>
						</CellControl>
					</FormCell>
					<FormCell select selectPos="before">
						<CellLabel>
							<Select 
								name="tel" 
								defaultValue="1"
								data={[
									{
										value: 1,
										label: '+86'
									},
									{
										value: 2,
										label: '+62'
									},
									{
										value: 3,
										label: '+80'
									}
								]}
							/>
							<CellArrow direction="bottom"></CellArrow>
						</CellLabel>
						<CellControl>
							<input type="tel" placeholder="Enter Phone" />
						</CellControl>
						<CellClear></CellClear>
					</FormCell>
				</Cells>
				<input type="submit" value="submit" height="20" width="50"/>
			</form>
			</Page>
		);
	}
};

export default InputPage;