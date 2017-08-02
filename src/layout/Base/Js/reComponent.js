import React, {Component, PropTypes} from 'react';

class ReComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			focused: props.focused || false,
		};
	}

	onChange = (e) => {
		event.persist();
	}

	onFocus = (e) => {
		event.persist(); // 在React.js中执行去抖动

		if (!('focused' in this.props)) {
			this.setState({
				focused: true,
			});
		}

		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	}

	onBlur = (e) => {
		event.persist(); // 在React.js中执行去抖动

		if (!('focused' in this.props)) {
			this.setState({
				focused: false,
			});
		}

		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	}

};

export default ReComponent;