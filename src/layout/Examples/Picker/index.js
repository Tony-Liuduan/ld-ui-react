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

class PickerPage extends Component {

	state = {
		showPicker: false
	};

	handleClick(e) {
		e.preventDefault();
		this.setState({showPicker: true});
	}

	render() {
		const {showPicker} = this.state;
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
								onClick={this.handleClick.bind(this)}
							/>							
							<CellArrow direction="down" />
						</CellControl>
					</FormCell>
				</Cells>
				<Picker 
					show={showPicker}
					onCancel={e => this.setState({showPicker: false})}
					data={[
						{
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
						}
					]}
				/>
			</Page>
		);
	}
};

export default PickerPage;