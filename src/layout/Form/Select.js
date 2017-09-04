import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ValidateHoc from './ValidateHoc';

// wrapper for select
class Select extends Component {

	static propTypes = {
		data: PropTypes.array,
		value: PropTypes.any
	};

	static defaultProps = {
		data: [],
		value: ''
	};

	componentDidMount() {
		if (this.props.required || this.props.validate.required) {
			this.props.getTarget(this.select);
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value
		}
	}

	handleChange(e) {
		this.setState({value: e.target.value});
		const {validateHOC} = this.props;
		// 自身 required
		validateHOC.required && validateHOC.handleChange(e);
	}

	renderData(data) {
		return data.map((item, i) => (
			<option key={i} value={item.value} {...item} disabled={item.value ? false : true}>
				{item.label}
			</option>
		));
	}

	render() {
		const {data, className, children, value, onChange, validate, validateHOC, getTarget, ...other} = this.props;		
		const cls = classNames({
			'ui-inputselect': true,
			'ui-inputselect-default': this.state.value === ''
		}, className);

		return (
			<select className={cls} value={this.state.value} onChange={this.handleChange.bind(this)} ref={(ref) => {this.select = ref;}} {...other}>
				{
					data.length > 0 
						? this.renderData(data)
						: children
				}
			</select>
		);
	}
};

export default ValidateHoc(Select);