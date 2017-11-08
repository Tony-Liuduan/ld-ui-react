import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './select.scss';

// wrapper for select
const Select = props => {

    const { data, className, children, value, selected, onChange, placeholder, multiple, ...other } = props;
    const cls = classNames('ld-select', {
        'ld-select-placeholder': !`${value}`
    }, className);

    const renderOption = data => {
        const result = data.map((item, i) => (
            <option key={i} value={item.value}>
                {item.label}
            </option>
        ));
        result.unshift(
            <option key={'ldSelectPlaceholder'} value={placeholder} disabled>
                {placeholder}
            </option>
        )
        return result;
    }

    return (
        <select className={cls} value={value || placeholder} onChange={onChange} {...other}>
            {
                data.length
                    ? renderOption(data)
                    : children
            }
        </select>
    );
};

Select.propTypes = {
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

Select.defaultProps = {
    data: [],
    value: '',
    placeholder: '请选择'
};

export default Select;