import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Autoclear from './autoclear';

import './input.scss';

// wrapper for input
class Input extends Component {

    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        type: PropTypes.string,
        err: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        placeholder: '请输入',
        defaultValue: '',
        type: 'text',
        err: false,
        onChange(){},
        onFocus(){},
        onBlur(){}
    };

    constructor(props) {
        super(props);
        this.state = {
            value: 'value' in props ? props.value : props.defaultValue,
            xshow: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        } else if ('defaultValue' in nextProps) {
            this.setState({
                value: nextProps.defaultValue
            });
        }
    }

    handleChange(e) {
        e.persist(); // 在React.js中执行去抖动
        const { value } = e.target;
        this.setState({ value }, () => {
            this.controlXshow(value); // 自动显示clear btn
            this.props.onChange(value);
        });
    }

    handleFocus(e) {
        e.persist(); // 在React.js中执行去抖动
        const { value } = this.state;
        // 如果有值则显示x
        this.controlXshow(value); // 自动显示clear btn
        this.props.onFocus(value);
    }

    handleBlur(e) {
        e.persist(); // 在React.js中执行去抖动
        // 通过异步操作保证先执行clearbtn中click事件，后执行input的onblur事件，保证clearbtn的存在可以清楚value
        const { value, xshow } = this.state;
        setTimeout(() => {
            // 异步执行 需要先判断目标是否被删除
            if (!e.target) return;
            // 自动隐藏clear btn
            if (xshow) this.controlXshow('');     
            this.props.onBlur(value);
        }, 0);
    }

    handleClear() {
        this.setState({
            value: ''
        });
    }

    controlXshow(value) {
        this.setState({
            xshow: !!`${value}`
        })
    }

    render() {
        const { 
            className, 
            type,
            defaultValue,
            value, 
            placeholder,
            onChange, 
            onFocus, 
            onBlur, 
            err,
            ...others 
        } = this.props;
        const { xshow } = this.state;
        const clsPrefix = 'ld-input';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-err`]: err
        }, className);
        
        return (
            <div className={cls}>
                <input
                    type={type}
                    value={this.state.value}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    {...others} />
                <Autoclear show={xshow} err={err} onClear={this.handleClear}/>
            </div>
        );
    }
};

export default Input;