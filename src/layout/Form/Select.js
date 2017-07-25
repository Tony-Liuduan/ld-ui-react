import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

// wrapper for select
class Select extends Component {

	static propTypes = {
		data: PropTypes.array
	};

	static defaultProps = {
		data: []
	};

	renderData(data) {
		return data.map((item, i) => (
			<option key={i} value={item.value} {...item}>
				{item.label}
			</option>
		));
	}

	render() {
		const {data, className, children, ...other} = this.props;
		const cls = classNames({
			'ui-inputselect': true
		}, className);
		return (
			<select className={cls} {...other} >
				{
					data.length > 0 
						? this.renderData(data)
						: children
				}
			</select>
		);
	}
};

export default Select;