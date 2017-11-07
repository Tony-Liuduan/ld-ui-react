import React from 'react';
import Page from '../../Page/index';
import {
	Form,
	Submit,
	Input,
	Radio,
	Checkbox,
	Select,
	Switch,
	Agreement,
	Textarea,
	Smscode
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

const data = [
	{ value: 0, label: 'Ph.D.' },
	{ value: 1, label: 'Bachelor' },
	{ value: 2, label: 'College' },
];


class InputPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			radio: '1',
			checkbox: ['0', '2'],
			agree: false,
			switch: false,
			select: '0'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, t) {
		let { type, name, value, checked } = e.target;
		type = t || type;
		switch (type) {
			case 'radio':
			case 'select-one':
				this.setState({
					[name]: value
				})
				break;
			case 'checkbox':
				let result = this.state[name];
				if (checked && !result.includes(value)) {
					result.push(value);
				} else {
					result = result.filter(i => i !== value)
				}
				this.setState({
					[name]: result
				});
				break;
			case 'switch':
				this.setState({
					switch: checked
				});
				break;
			case 'agreement':
				this.setState({
					agree: checked
				});
				break;
			default:
				break;
		}
	}


	render() {
		return (
			<Page title="Input" subTitle="表单输入">
				<div >
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
					{data.map(i => {
						return <Radio
							key={i.value}
							inline={false}
							name="radio"
							label={i.label}
							value={i.value}
							checked={this.state.radio === `${i.value}`}
							onChange={this.handleChange} />
					})}

					{/*================  checkbox  =================*/}
					<CellsTitle>Checkbox</CellsTitle>
					{data.map(i => {
						return <Checkbox
							key={i.label}
							inline={false}
							name="checkbox"
							label={i.label}
							value={i.value}
							checked={this.state.checkbox.includes(`${i.value}`)}
							onChange={this.handleChange} />
					})}

					{/*================  checkbox-inline  =================*/}
					<CellsTitle>Checkbox-inline</CellsTitle>
					<FormCell checkboxInline>
						<CellLabel>汽车</CellLabel>
						{data.map((i, index) => {
							return <Checkbox
								key={index + 2}
								name="checkbox"
								label={i.label}
								value={i.value}
								checked={this.state.checkbox.includes(`${i.value}`)}
								onChange={this.handleChange} />
						})}
					</FormCell>

					{/*================  switch  =================*/}
					<CellsTitle>Switch</CellsTitle>
					<Switch
						inline={false}
						label={'switch'}
						checked={this.state.switch}
						onChange={this.handleChange} />

					
					
					
					
					
					{/*================  agreement  =================*/}
					<CellsTitle>Agreement</CellsTitle>
					<Agreement
						label={'同意'}
						checked={this.state.agree}
						onChange={this.handleChange}>
						<a>《车分期征信查询授权书》</a>
						<a>《车分期征信查询授权书》</a>
						<a>《车分期征信查询授权书》</a>
						<a>《车分期征信查询授权书》</a>
					</Agreement>
					{/*================  select  =================*/}
					<CellsTitle>Select</CellsTitle>
					<FormCell select selectPos="after">
						<CellLabel>Select after</CellLabel>
						<CellControl>
							<Select
								name="select"
								value={this.state.select}
								placeholder="选我"
								onChange={this.handleChange}
								data={data}
								disabled
							/>
							<CellArrow direction="down"></CellArrow>
						</CellControl>
					</FormCell>
					<FormCell select>
						<CellControl>
							<Select
								name="select"
								value={this.state.select}
								placeholder="选我"
								onChange={this.handleChange}
								data={data}
							/>
							<CellArrow></CellArrow>
						</CellControl>
					</FormCell>
					<FormCell select selectPos="before">
						<CellLabel>
							<Select
								name="select"
								value={this.state.select}
								placeholder="选我"
								onChange={this.handleChange}
								data={data}
							/>
							<CellArrow direction="down"></CellArrow>
						</CellLabel>
						<CellControl>
							<Input type="tel" placeholder="Enter Phone" />
						</CellControl>
						<CellClear></CellClear>
					</FormCell>
					{/*================  smscode  =================*/}
					<CellsTitle>Smscode</CellsTitle>
					<FormCell>
						<CellLabel>验证码</CellLabel>
						<CellControl>
							<Input type="number" defaultValue="0987" />
						</CellControl>
						<CellClear />
						<Smscode onClick={() => console.log(123)}>获取验证码</Smscode>
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
					{/*<input type="submit" value="submit" height="20" width="50"/>*/}
				</div>
				<ButtonArea space>
					<Submit>提 交</Submit>
				</ButtonArea>
			</Page>
		);
	}
};

export default InputPage;