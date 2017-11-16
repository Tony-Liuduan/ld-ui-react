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
	Smscode,
	Validaterule,
	ValidateHOC
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
			text: '',
			text1: '',
			radio: '1',
			checkbox: ['0', '2'],
			agree: false,
			switchinput: false,
			select: '0',
			textarea: 'what are u',
			textErr: false,
			text1Err: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleInputchange = this.handleInputchange.bind(this);
		this.handleTextareaChange = this.handleTextareaChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handlerBlur = this.handlerBlur.bind(this);
	}

	componentDidMount() {
		this.setState({
			text: '123'
		})
	}

	handleChange(e, t) {
		let { type, name, value, checked } = e.target;
		type = t || type;
		switch (type) {
			case 'radio':
			case 'select-one':
				this.setState({
					[name]: value
				});
				break;
			case 'checkbox':
				let result = this.state[name];
				if (checked && !result.includes(value)) {
					result.push(value);
				} else {
					result = result.filter(i => i !== value);
				}
				this.setState({
					[name]: result
				});
				break;
			case 'switch':
				this.setState({
					switchinput: checked
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

	handleInputchange(val, key) {
		this.setState({ [key]: val });
		if (this.state[`${key}Err`]) this.setState({ [`${key}Err`]: false });
	}

	handleTextareaChange(val) {
		this.setState({ textarea: val });
	}

	handlerBlur({ value, rule, param, required }) {
		const { isValid, message } = this.props.inputValidate({ value, rule, param, required });
		/* 
		根据·isValid·判断input是否校验通过，包括 required && validate rule 校验，true 为通过，false 为不通过
		根据·message·返回信息 
			如果为 'required' 可执行toast提示改项为必须项，
			如果为 其他 可执行toast提示错误信息message
		*/
		if (!isValid) {
			console.log(message)
		}
	}

	onSubmit() {
		let { text, text1, checkbox } = this.state;
		// 循环调用验证方法
		let validateArr = [
			{
				ref: this.a,
				name: 'a',
				value: text,
				rule: ['idNumber', 'idcardUnique'],
				param: [0, 2],
				err: 'textErr',
				required: true
			}, {
				name: 'b',
				value: text1,
				rule: 'number',
				param: [0, 2],
				err: 'text1Err',
				message: 'mmmmm'
			}, {
				name: 'c',
				value: checkbox,
				required: true
			}
		];

		this.props.formValidate(validateArr)
			.then(query => {
				// query为提交表单插叙字符串
				console.log(query)
			})
			.catch(err => {
				// 可执行toast，err为错误message
				console.log(err)
			})
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
							<Input
								ref={el => this.a = el}
								type="text"
								value={this.state.text}
								err={this.state.textErr}
								onChange={val => this.handleInputchange(val, 'text')}
								onBlur={val => this.handlerBlur({ value: val, required: true })}
								placeholder="please input"
							/>
						</CellControl>
						<CellClear />
					</FormCell>
					<FormCell>
						<CellLabel>InputLabel</CellLabel>
						<CellControl>
							<Input
								type="text"
								value={this.state.text1}
								err={this.state.text1Err}
								onChange={val => this.handleInputchange(val, 'text1')}
								placeholder="please input"
							/>
						</CellControl>
						<CellClear />
					</FormCell>
					<FormCell>
						<CellLabel>Nocontrol</CellLabel>
						<CellControl>
							<Input type="text" defaultValue={this.state.text} placeholder="please input" />
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
					<CellsTitle>Checkbox-inline-nocontorl</CellsTitle>
					<FormCell checkboxInline>
						<CellLabel>汽车</CellLabel>
						{data.map((i, index) => {
							return <Checkbox
								key={index + 2}
								name="checkbox"
								label={i.label}
								value={i.value}
								defaultChecked={this.state.checkbox.includes(`${i.value}`)} />
						})}
					</FormCell>

					{/*================  switch  =================*/}
					<CellsTitle>Switch</CellsTitle>
					<Switch
						inline={false}
						label={'switch'}
						checked={this.state.switchinput}
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
							<Textarea name="textarea" value={this.state.textarea} onChange={this.handleTextareaChange} maxLength={50} />
						</CellContent>
					</FormCell>
					<FormCell>
						<CellContent>
							<Textarea name="textarea" defaultValue="textarea" showCounter={false} />
						</CellContent>
					</FormCell>
					{/*<input type="submit" value="submit" height="20" width="50"/>*/}
				</div>
				
				<ButtonArea space >
					<Button type="orange-white" onClick={this.onSubmit}>提 交</Button>
				</ButtonArea>
			</Page>
		);
	}
};

export default ValidateHOC(InputPage);