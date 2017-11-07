import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import {Post} from '../../Server/index';

import {parseJsonData} from '../../Base/Js/utils';

let tempValue = [], tempCodes = [];
// input 提交name值
const submitNames = ['liveProvinceCode', 'liveCityCode', 'liveDistrictCode'];
// 定义各级picker名
const picekerMap = {
	0: 'picker_0',
	1: 'picker_1',
	2: 'picker_2'
};
class PickerPage extends Component {

	state = {
		picker_0: false,
		picker_1: false,
		picker_2 : false,
		cityList: {},
		cityValue: '',
		cityCodes: []
	};

	fetchList(picker, code='') {
		const params = {type: picker, code: code};
		Post('/citylist', params)
		.then(data => {
			this.setState({
				cityList: Object.assign(this.state.cityList, {[picker]: parseJsonData(data)}),
				[picker]: true
			});
		});
	}

	handleShow(nextPicker, code) {
		// 判断省级数据列表是否已经获取
		if (nextPicker === picekerMap[0] && (!!this.state.cityList[nextPicker])) {
			this.setState({[nextPicker]: true});
		} else {
			this.fetchList(nextPicker, code);
		}
	}

	handleHide(currentPicker) {
		this.setState({[currentPicker]: false});
	}
	
	handleCancel() {
		this.setState({picker_0: false, picker_1: false, picker_2: false});
	}

	handleSelect(message, cb, firstIndex, lastIndex) {
		// 如果不是最后一个就不请求数据
		if (firstIndex) {
			tempValue = [].concat();
			tempCodes = [].concat();
		}

		if (!!tempValue[message.index]) {
			tempValue.splice(message.index, 1);
		}
		tempValue = tempValue.concat([message.label]);
		tempCodes = tempCodes.concat([message.code]);
	
		lastIndex ? this.setState({cityValue: tempValue.join(' '), cityCodes: tempCodes}) : false;
		if (cb) cb();
	}

	renderInputCode(submitNames) {
		const {cityCodes} = this.state;
		return cityCodes.length > 0 
			? submitNames.map((subname, index) => (
				<input key={index} type="hidden" name={subname} value={cityCodes[index]} required="true" />
			))
			: false;
	}

	renderCityPicker(pickers) {
		return pickers.map((picker, index) => {
			const firstIndex = index === 0;
			const lastIndex = index === pickers.length-1;
			return <Picker 
				key={index}
				index={index}
				show={picker.show}
				onShow={e => this.handleShow(picker.nextPicker, tempCodes[index])}
				onHide={e => this.handleHide(picker.currentPicker)}
				onCancel={e => this.handleCancel()}
				onSelect={(city, cb) => this.handleSelect(city, cb, firstIndex, lastIndex)}
				selectCitys={this.state.cityCodes}
				data={picker.data}
			/>
		});
	}

	render() {
		const {picker_0, picker_1, picker_2, cityList, cityValue} = this.state;
		const cls = classNames({
			'ui-inputselect': true,
			'ui-placeholder': !cityValue
		});
		const cityPickers = [picker_0, picker_1, picker_2].map((picker, i) => {
			return {
				show: picker,
				currentPicker: picekerMap[i],
				nextPicker: picekerMap[i+1],
				data: cityList[picekerMap[i]] || []
			};
		});
		return (
			<Page title="Picker" subTitle="多列选择器" className="picker">
				<Cells>
					<CellsTitle>Picker</CellsTitle>
					<FormHeader>住宅信息</FormHeader>
					<FormCell select selectPos="after">
						<CellLabel>所在地区</CellLabel>
						<CellControl>
							<div className={cls} onClick={e => this.handleShow(picekerMap[0])}>	
								{cityValue == '' ? '请选择省市区' : cityValue}	
							</div>					
							<CellArrow direction="down"></CellArrow>
							<div>
								{this.renderInputCode(submitNames)}							
							</div>											
						</CellControl>
					</FormCell>
				</Cells>
				{this.renderCityPicker(cityPickers)}
			</Page>
		);
	}
};

export default PickerPage;