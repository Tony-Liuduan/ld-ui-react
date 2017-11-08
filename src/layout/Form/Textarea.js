import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Autoclear from './autoclear';

import './textarea.scss';

// wrapper for Textarea
class Textarea extends Component {

    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        type: PropTypes.string,
        err: PropTypes.bool,
        maxLength: PropTypes.number,
        showCounter: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        placeholder: '请输入',
        defaultValue: '',
        type: 'text',
        err: false,
        maxLength: 50,
        showCounter: true,
        onChange() { },
        onFocus() { },
        onBlur() { }
    };

    constructor(props) {
        super(props);
        this.state = {
            value: 'value' in props ? props.value : props.defaultValue,
            xshow: false,
            textCounter: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        const { value } = this.state;
        if (`${value}`.length) this.setState({ textCounter: `${value}`.length });
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
        this.setState({ 
            value, 
            textCounter: `${value}`.length
        }, () => {
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

    renderCounter(maxLength) {
        return (
            <div className="ld-textarea-counter">
                <span>{this.state.textCounter}</span>{maxLength ? '/' + maxLength : false}
            </div>
        );
    }

    render() {
        const {
            className,
            defaultValue,
            value,
            placeholder,
            onChange,
            onFocus,
            onBlur,
            err,
            maxLength,
            showCounter,
            ...others
        } = this.props;
        const { xshow } = this.state;
        const clsPrefix = 'ld-textarea';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-err`]: err
        }, className);

        return (
            <div className={cls}>
                <textarea
                    maxLength={maxLength}
                    value={this.state.value} 
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    {...others} />
                <div className={`${clsPrefix}-tip`}>
                    <Autoclear show={xshow} err={err} onClear={this.handleClear} />
                    {showCounter ? this.renderCounter(maxLength) : null}
                </div>
            </div>
        );
    }
};

export default Textarea;