import React, {Component, PropTypes} from 'react';
import Page from '../../Page/index';
import {
	Cells,
	CellsTitle,
	FormHeader,
	FormCell,
	CellLabel,
	CellControl,
	CellArrow
} from '../../Cell/index';

import {Picker} from '../../Picker/index';

let tempValue = [];
class PickerPage extends Component {

	state = {
		showPicker_province: false,
		showPicker_city: false,
		showPicker_district : false,
		cityValue: ''
	};

	handleShow(nextPicker) {
		this.setState({[nextPicker]: true});
	}

	handleHide(currentPicker) {
		this.setState({[currentPicker]: false});
	}
	
	handleCancel() {
		this.setState({showPicker_province: false, showPicker_city: false, showPicker_district: false});
	}

	handleSelect(label, cb, firstIndex, lastIndex) {
		firstIndex ? tempValue = [] : false;
		tempValue.push(label);
		lastIndex ? this.setState({cityValue: tempValue.join(' ')}) : false;
		if (cb) cb();
	}

	renderCityPicker(pickers) {
		return pickers.map((picker, index) => {
			const firstIndex = index === 0;
			const lastIndex = index === pickers.length-1;
			return <Picker 
				key={index}
				index={index}
				show={picker.show}
				onShow={this.handleShow.bind(this, picker.nextPicker)}
				onHide={this.handleHide.bind(this, picker.currentPicker)}
				onCancel={this.handleCancel.bind(this)}
				onSelect={(label, cb) => this.handleSelect(label, cb, firstIndex, lastIndex)}
				selectCitys={this.state.cityValue.split(" ")}
				data={picker.data}
			/>
		});
	}


	render() {
		const {showPicker_province, showPicker_city, showPicker_district, cityValue} = this.state;
		const cityPickers = [{
					show: showPicker_province,
					currentPicker: 'showPicker_province',
					nextPicker: 'showPicker_city',
					data: [{
							"label":"北京市",
							"checked": true
						},
						{
							"label":"天津市",
						},
						{
							"label":"南京市",
						},
						{
							"label":"广州市",
						},
						{
							"label":"沈阳市",
						},
						{
							"label":"太原市",
						},
						{
							"label":"长沙市",
						},
						{
							"label":"海南市",
						},
						{
							"label":"兰州市",
						},
						{
							"label":"西安市",
						},
						{
							"label":"哈尔滨市",
						},
						{
							"label":"吉林市",
						}]
				},{
					show: showPicker_city,
					currentPicker: 'showPicker_city',
					nextPicker: 'showPicker_district',
					data: [{
						"label":"北京市",
						},
						{
							"label":"天津市",
						},
						{
							"label":"南京市",
						},
						{
							"label":"广州市",
						},
						{
							"label":"沈阳市",
							"checked": true
						},
						{
							"label":"太原市",
						},
						{
							"label":"长沙市",
						},
						{
							"label":"海南市",
						},
						{
							"label":"兰州市",
						},
						{
							"label":"西安市",
						},
						{
							"label":"哈尔滨市",
						},
						{
							"label":"吉林市",
						}]
				},{
					show: showPicker_district,
					currentPicker: 'showPicker_district',
					nextPicker: '',
					data: [{
						"label":"北京市",
						},
						{
							"label":"天津市",
						},
						{
							"label":"南京市",
						},
						{
							"label":"广州市",
						},
						{
							"label":"沈阳市",
						},
						{
							"label":"太原市",
						},
						{
							"label":"长沙市",
						},
						{
							"label":"海南市",
							"checked": true
						},
						{
							"label":"兰州市",
						},
						{
							"label":"西安市",
						},
						{
							"label":"哈尔滨市",
						},
						{
							"label":"吉林市",
						}]
				}];
		return (
			<Page title="Picker" subTitle="多列选择器" className="picker">
				<Cells>
					<CellsTitle>Picker</CellsTitle>
					<FormHeader>住宅信息</FormHeader>
					<FormCell select selectPos="after">
						<CellLabel>所在地区</CellLabel>
						<CellControl>
							<input 
								type="text" 
								placeholder="请选择省市区"
								readOnly 
								className="ui-inputselect" 
								style={{height: "50px"}} 
								onClick={this.handleShow.bind(this, 'showPicker_province')}
								value={cityValue}
							/>							
							<CellArrow direction="down" />
						</CellControl>
					</FormCell>
				</Cells>
				{this.renderCityPicker(cityPickers)}
			</Page>
		);
	}
};

export default PickerPage;