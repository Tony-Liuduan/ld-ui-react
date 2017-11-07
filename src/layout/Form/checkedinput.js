import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    CellContent,
    FormCell
} from '../Cell/index';

import './checkedinput.scss';

const Checkedinput = props => {
    let {
        className,
        children,
        inline,
        type,
        checked,
        label,
        defaultChecked,
        disabled,
        onChange,
        ...other
    } = props, cls, inputModel;

    label = label ? label : children;

    if (['checkbox', 'radio'].includes(type)) {
        inputModel = 'checkbox';
        cls = classNames(`ld-${inputModel}-${inline ? 'label' : 'wrapper'}`, className);
    } else {
        inputModel = type;
        cls = classNames(`ld-${inputModel}`, className);
    }

    const inputComponent = (<input
        className={`ld-${inputModel}-input`}
        type={type === 'radio' ? type : 'checkbox'}
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e, type)}
        {...other} />);      

    // 同行时渲染
    const renderInline = (inputComponent, label) => (
        <label className={cls}>
            {inputComponent}
            {
                ['checkbox', 'agreement'].includes(inputModel) ? 
                    <div className={`ld-${inputModel}-content`}>
                        {inline ? label : null}
                    </div>
                : null
            }
        </label>
    );

    // 非同行时渲染
    const renderItem = (inputComponent, label) => (
        <FormCell checkbox>
            <CellContent>{label}</CellContent>
            {renderInline(inputComponent, label)}
        </FormCell>
    );

    if (inline) {
        return renderInline(inputComponent, label);
    } else {
        return renderItem(inputComponent, label);
    }
}

Checkedinput.propTypes = {
    className: PropTypes.string,
    inline: PropTypes.bool,
    type: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

Checkedinput.defaultProps = {
    className: '',
    inline: true,
    type: 'checkbox',
    label: '',
    checked: false,
    onChange() { }
};

export default Checkedinput;