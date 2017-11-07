import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './select.scss';

// wrapper for select
class Select extends Component {

    static propTypes = {
        data: PropTypes.array,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    };

    static defaultProps = {
        data: [],
        value: '',
        placeholder: '请选择'
    };

    renderOption(data) {
        const result = data.map((item, i) => (
            <option key={i} value={item.value}>
                {item.label}
            </option>
        ));
        result.unshift(
            <option key={'00'} value={this.props.placeholder} disabled>
                {this.props.placeholder}
            </option>
        )
        return result;
    }

    render() {
        const { data, className, children, value, selected, onChange, placeholder, multiple, ...other } = this.props;
        const cls = classNames('ld-select', {
            'ld-select-placeholder': !`${value}`
        }, className);

        return (
            <select className={cls} value={value || placeholder} onChange={onChange} {...other}>
                {
                    data.length > 0
                        ? this.renderOption(data)
                        : children
                }
            </select>
        );
    }
};

export default Select;