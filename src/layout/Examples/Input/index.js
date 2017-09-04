import React from 'react';
import Page from '../../Page/index';
import {
	Form,
	Submit,
	Input,
	Radio,
	Checkbox,
	CheckboxGroup,
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
	FormCell,
	FormHeader
} from '../../Cell/index';
import { Button, ButtonArea } from '../../Button/index';

class InputPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Page title="Input" subTitle="表单输入">
				<Form >
					<FormHeader>个人信息</FormHeader>
					{/*================  input  =================*/}
					<CellsTitle>Input</CellsTitle>
					<FormCell>
						<CellLabel>InputLabel</CellLabel>
						<CellControl>
							<Input name="a" type="text" placeholder="please input" validate={{ validType: 'sms[4]', hint: "请输入xxx", rules: 1, required: true }} />
						</CellControl>
						<CellClear />
					</FormCell>
					<Input name="b" type="hidden" value="13" required />
					{/*================  radio  =================*/}
					<CellsTitle>Radio</CellsTitle>
					<CheckboxGroup type="radio" id="0">
						<FormCell radio>
							<CellContent>Option 1</CellContent>
							<Radio name="radio1" value="1"></Radio>
						</FormCell>
						<FormCell radio>
							<CellContent>Option 2</CellContent>
							<Radio name="radio1" value="2"></Radio>
						</FormCell>
						<FormCell radio>
							<CellContent>Option 3</CellContent>
							<Radio name="radio1" value="3" disabled></Radio>
						</FormCell>
					</CheckboxGroup>
					<Cell link>
						<CellContent>More</CellContent>
					</Cell>
					{/*================  radio-inline  =================*/}
					<CellsTitle>Radio-inline</CellsTitle>
					<CheckboxGroup type="radio" id="1" required>
						<FormCell radioInline>
							<CellLabel>性别</CellLabel>
							<Radio name="sex" value="1" defaultChecked inline>男</Radio>
							<Radio name="sex" value="0" inline>女</Radio>
							<Radio name="sex" value="2" disabled inline>其他</Radio>
						</FormCell>
					</CheckboxGroup>
					{/*================  checkbox  =================*/}

					<CellsTitle>Checkbox</CellsTitle>
					<CheckboxGroup id="2">
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
					</CheckboxGroup>
					<Cell link>
						<CellContent>More</CellContent>
					</Cell>
					{/*================  checkbox-inline  =================*/}
					<CellsTitle>Checkbox-inline</CellsTitle>
					<CheckboxGroup id="3" required>
						<FormCell checkboxInline>
							<CellLabel>汽车</CellLabel>
							<Checkbox name="car1" value="0" disabled inline>奔驰</Checkbox>
							<Checkbox name="car2" value="1" inline>宝马</Checkbox>
							<Checkbox name="car3" value="2" inline>奥迪</Checkbox>
						</FormCell>
					</CheckboxGroup>
					{/*================  switch  =================*/}
					<CellsTitle>Switch</CellsTitle>
					<FormCell switch>
						<CellContent>Switch normal</CellContent>
						<Switch name="switch" required/>
					</FormCell>
					<FormCell switch>
						<CellContent>Switch defaultChecked</CellContent>
						<Switch name="switch defaultChecked" value="switch" defaultChecked />
					</FormCell>
					<FormCell switch>
						<CellContent>Switch disabled</CellContent>
						<Switch name="switch disabled" value="switch" disabled />
					</FormCell>
					{/*================  select  =================*/}
					<CellsTitle>Select</CellsTitle>
					<FormCell select selectPos="after">
						<CellLabel>Select after</CellLabel>
						<CellControl>
							<Select name="country" required>
								<option value="" disabled>请选择经营地类型</option>
								<option value="1">集中交易市场</option>
								<option value="2">非集中交易市场</option>
							</Select>
							<CellArrow direction="down"></CellArrow>
						</CellControl>
					</FormCell>
					<FormCell select>
						<CellControl>
							<Select name="connect" value="0">
								<option value="0">QQ</option>
								<option value="1">Weixin</option>
								<option value="2">Sina</option>
							</Select>
							<CellArrow></CellArrow>
						</CellControl>
					</FormCell>
					<FormCell select selectPos="before">
						<CellLabel>
							<Select
								name="tel"
								data={[
									{
										value: '',
										label: '请选择'
									},
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
							<CellArrow direction="down"></CellArrow>
						</CellLabel>
						<CellControl>
							<Input type="tel" placeholder="Enter Phone" />
						</CellControl>
						<CellClear></CellClear>
					</FormCell>
					{/*================  vcode  =================*/}
					<CellsTitle>Vcode</CellsTitle>
					<FormCell>
						<CellLabel>验证码</CellLabel>
						<CellControl>
							<Input type="number" defaultValue="0987" />
						</CellControl>
						<CellClear />
						<VCode onClick={() => console.log(123)}>获取验证码</VCode>
					</FormCell>
					{/*================  phone  =================*/}
					<CellsTitle>Phone</CellsTitle>
					<FormCell>
						<CellLabel>验证码</CellLabel>
						<CellControl>
							<Input type="number" defaultValue="1234" />
						</CellControl>
						<CellClear />
						<VCode>Send</VCode>
					</FormCell>
					{/*================  date  =================*/}
					<CellsTitle>Date</CellsTitle>
					<FormCell>
						<CellLabel>Date</CellLabel>
						<CellControl>
							<Input type="date" />
						</CellControl>
					</FormCell>
					<FormCell>
						<CellLabel>Datetime</CellLabel>
						<CellControl>
							<Input type="datetime-local" />
						</CellControl>
					</FormCell>
					{/*================  textarea  =================*/}
					<CellsTitle>Textarea</CellsTitle>
					<FormCell>
						<CellContent>
							<Textarea name="textarea" placeholder="Enter your comments" maxLength={50} required></Textarea>
						</CellContent>
					</FormCell>
					<FormCell>
						<CellContent>
							<Textarea name="textarea" defaultValue="textarea" showCounter={false}></Textarea>
						</CellContent>
					</FormCell>
					{/*================  agreement  =================*/}
					<Agreement label="同意" value="agreement" required>
						<a>《车分期征信查询授权书》</a>
						<a>《车分期征信查询授权书》</a>
						<a>《车分期征信查询授权书》</a>
						<a>《车分期征信查询授权书》</a>
					</Agreement>
					{/*<input type="submit" value="submit" height="20" width="50"/>*/}
				</Form>
				<ButtonArea space>
					<Submit>提 交</Submit>
				</ButtonArea>
			</Page>
		);
	}
};

export default InputPage;