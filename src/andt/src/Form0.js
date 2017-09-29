import React from 'react';
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon
} from 'antd';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false
    };
    
    handleSearch = (e) => {
        e.preventDefault();

        const {
                getFieldsValue,
                getFieldValue, 
                setFieldsValue, 
                setFields,
                validateFields,
                validateFieldsAndScroll, // 相比validateFields能滚动到错误位置
                getFieldError,
                getFieldsError,
                isFieldValidating
            } = this.props.form;
        
        /* ============ Form.create()后 ...this.props.form  API 使用 ============ */
        // 1.获取所有值 
        const values = getFieldsValue();    
        // 2.获取某个值,根据label字段获取，注意参数不是name值，是field值
        const value = getFieldValue('field-1'); 
        // 3.动态设置一组字段值   
        setFieldsValue({
            'field-1': `Hi, ${value === undefined
                ? 'man'
                : 'lady'}!`,
            'field-2': value === undefined
        });
        // 4.动态设置一组字value & 校验错误提示error
        setFields({
            'field-0': {
                value: values['field-0'] === undefined,
                errors: [new Error('forbid ha')],
            },
            'field-1': {
                value: 'field-1',
                errors: [new Error('field-1 error')],
            }
        });
        // 5. 校验并获取一组输入域的 值 和 error
            /* 
                参数1：可以指定字段，使用string[]数组格式 第一个参数 例：['field-0', 'field-1', 'field-2'], 不写则校验全部
                参数2：options
                参数3：回调
            */
        validateFieldsAndScroll((errors, values) => {
            console.log('Received values of form: ', errors, values);
        });
        // 6. 获取某个字段的error
        const error = getFieldError('field-1');
        // 7. 获取 一组 或 所有字段的 error
        const errors = getFieldsError();
        console.log(errors);
        // 8. 判断字段是否在校验状态
        console.log( isFieldValidating('field-1') );
    }

    handleReset = () => {
        this
            .props
            .form
            .resetFields(); // 清除值
    }

    toggle = () => {
        const {expand} = this.state;
        this.setState({
            expand: !expand
        });
    }

    // To generate mock Form.Item
    getFields = () => {
        const count = this.state.expand
            ? 10
            : 6;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col
                    span={8}
                    key={i}
                    style={{
                    display: i < count
                        ? 'block'
                        : 'none'
                }}>
                    <FormItem {...formItemLayout} label={`Field ${i}`}>
                        {/* getFieldDecorator 用于和form双向绑定 */}
                        {getFieldDecorator(`field-${i}`, {initialValue: i === 4 ? 'yy' : null, validateTrigger: 'onBlur', rules: [{ required: true, message: 'Please input your note!' }],})(<Input placeholder="placeholder"/>)}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }
     
    render() {
        // onSubmit 就是htmlType="submit" btn click 触发的事件
        return ( 
        <Form className = "ant-advanced-search-form" onSubmit = {this.handleSearch}> 
            <Row gutter={20}>{this.getFields()}</Row> 
            <Row> 
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">Search</Button>
                    <Button
                        style={{
                            marginLeft: 8
                        }}
                        onClick={this.handleReset}>
                        Clear
                    </Button>
                    <a
                        style={{
                            marginLeft: 8,
                            fontSize: 12
                        }}
                        onClick={this.toggle}>
                        Collapse
                        <Icon
                            type={this.state.expand
                            ? 'up'
                            : 'down'}/>
                    </a>
                </Col> 
            </Row>
        </Form>);
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

const FormSearch = (props) => {
    return (
        <div>
            <WrappedAdvancedSearchForm/>
            <div className="search-result-list">Search Result List</div>
        </div>
    )
};

export default FormSearch;