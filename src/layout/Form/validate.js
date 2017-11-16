import React, { Component } from 'react';
import Validaterule from './validate.rule';

const ValidateHoc = (Form, rules) => {

    const validRules = rules ? Object.assign({}, Validaterule, rules) : Validaterule;

    return class ValidateHoc extends Component {

        constructor(props) {
            super(props);
            this.formValidate = this.formValidate.bind(this);
            this.inputValidate = this.inputValidate.bind(this);
        }

        // 表单提交校验方法
        formValidate(validData = []) {
            return new Promise((resolve, reject) => {
                let flag = true, query = {}, msg;
                let i = 0, len = validData.length;
                for (i; i < len; i++) {
                    const item = validData[i];
                    const { ref, name, value, rule, param, required, err } = item;
                    // 判断是否需要验证
                    if (required || rule) {
                        const { isValid, message } = this.inputValidate({ value, rule, param, required });
                        if (!isValid) {
                            this.validateRef.setState({
                                [err]: true
                            }, () => {
                                // 自动选中错误项焦点，异步执行，防止先与onBlur事件执行
                                setTimeout(() => {
                                    ref && ref.inputRef.focus();
                                }, 0);
                                msg = item.message || message;
                                reject(msg);
                            });
                            flag = false;
                            break;
                        }
                        // 验证通过将其添加到query中
                        if (name) query[name] = value;
                    }
                }
                // 校验成功 提交表单
                if (flag) {
                    resolve(query);
                }
            });
        }
        
        // input校验方法
        inputValidate({ value, rule, param, required }) {
            let isValid = true, message = '', rules = [];
            // 支持 多种 规则校验
            if ((typeof rule === 'string' && rule) || (Array.isArray(rule) && rule.length)) rules = rules.concat(rule); 

            let noEmpty = (Array.isArray(value) && value.length) || (typeof value !== 'object' && value !== '');
            // 先判断是否必填
            if (!noEmpty && required) {
                isValid = false;
                message = 'required';
                // 判断是否符合检验规则
            } else if (noEmpty && rules.length) {
                let i = 0, len = rules.length;

                for (i; i < len ; i++) {
                    let validateFun = validRules[rules[i]];
                    if (validateFun && typeof validateFun === 'function') {
                        
                        const validateObj = validateFun(value, param);
                        isValid = validateObj.validator;
                        message = validateObj.message || '输入不符合规则';

                        if (!isValid) break;
                    }
                }
            }
            return { isValid, message };
        }

        render() {
            return <Form {...this.props} formValidate={this.formValidate} inputValidate={this.inputValidate} ref={el => this.validateRef = el} />
        }
    };
};

export default ValidateHoc;