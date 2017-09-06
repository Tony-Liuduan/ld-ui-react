import React from 'react';
import {Table, Icon, Switch, Radio, Form, Button} from 'antd';
const FormItem = Form.Item;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name), // value = true服务端排序
        width: 150,
        render: (text, record, index) => <a href={`#/deltail/${index}`}>{text}</a>
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        filterMultiple: false, // 是否多选，默认值true checbox radio显示切换
        filters: [
            {
                text: '0-18',
                value: [0, 18]
            }, {
                text: '18-30',
                value: [18, 30]
            }, {
                text: '30-50',
                value: [30, 50]
            }, {
                text: '50-70',
                value: [50, 70]
            }, {
                text: '70及以上',
                value: [70, 9000]
            }
        ],
        onFilter: (value, record) => record.age >= Number.parseInt(value.split(',')[0]) && record.age < Number.parseInt(value.split(',')[1]), // 根据年龄范围筛选
        sorter: (a, b) => a.age - b.age // 按年级大小排序
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        onCellClick: (record, event) => console.log('onCellClick', record, event) // 单击单元格回调
    }, {
        title: 'Action',
        key: 'action',
        width: 360,
        fixed: 'right',
        render: (text, record) => (
            <span>
                <a href="#">Action 一 {record.name}</a>
                <span className="ant-divider"/>
                <a href="#">Delete</a>
                <span className="ant-divider"/>
                <a href="#" className="ant-dropdown-link">
                    More actions
                    <Icon type="down"/>
                </a>
            </span>
        )
    }
];

const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({key: i, name: `John Brown${i}`, age: `${i}2`, address: `New York No. ${i} Lake Park`, description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`});
}

const expandedRowRender = record => <p>{record.description}</p>; // 展开额外的行渲染显示
const title = () => 'Here is title';    // 表标题，不是表格第一行
const showHeader = true;                // 控制表头显示属性，表格第一行
const footer = () => 'Here is footer';  // 表footer
const scroll = {                        // 设置包裹data部分高度，不设置自动适应, 设置后判断是否可滚动
    y: 240
};

class AndtTable1 extends React.Component {
    state = {
        bordered: false,   // 是否显示边框
        loading: false,    // loading 开关
        pagination: true,  // 是否打开分页器，传入Table可以是可配置对象
        size: 'default',
        expandedRowRender,  // 展开额外部分
        title,
        showHeader,
        footer, 
        rowSelection: {},   // 控制显示checkbox选框配置项  默认值null 
        scroll: undefined
    }

    handleToggle = (prop) => {
        return (enable) => {
            this.setState({[prop]: enable});
        };
    }

    handleSizeChange = (e) => {
        this.setState({size: e.target.value});
    }

    handleExpandChange = (enable) => {
        this.setState({
            expandedRowRender: enable
                ? expandedRowRender
                : false
        });
    }

    handleTitleChange = (enable) => {
        this.setState({
            title: enable
                ? title
                : undefined
        });
    }

    handleHeaderChange = (enable) => {
        this.setState({
            showHeader: enable
                ? showHeader
                : false
        });
    }

    handleFooterChange = (enable) => {
        this.setState({
            footer: enable
                ? footer
                : undefined
        });
    }

    handleRowSelectionChange = (enable) => {
        this.setState({
            rowSelection: enable
                ? 
                {
                    type: 'checkbox',
                    selections: true,
                    // 选中后触发回调
                    onSelect: (record, selected, selectedRows) => console.log('onSelect', record, selected, selectedRows), // 点击某一行时触发
                    onChange: (selectedRowKeys, selectedRows) => console.log('onChange', selectedRowKeys, selectedRows),   // 只要表格发生选中变化就触发
                    onSelectAll: (selected, selectedRows, changeRows) => console.log('onSelectAll', selected, selectedRows, changeRows),  // 点击顶部全选全不选按钮触发
                    onSelectInvert: selectedRows => console.log('onSelectInvert', selectedRows)  // 手动点击顶部箭头反选时触发
                }
                : undefined
        });
    }

    handleScollChange = (enable) => {
        this.setState({
            scroll: enable
                ? scroll
                : undefined
        });
    }

    render() {
        const state = this.state;
        return (
            <div>
                <div className="components-table-demo-control-bar">
                    <Form layout="inline">
                        <FormItem label="Bordered">
                            <Switch checked={state.bordered} onChange={this.handleToggle('bordered')}/>
                        </FormItem>
                        <FormItem label="loading">
                            <Switch checked={state.loading} onChange={this.handleToggle('loading')}/>
                        </FormItem>
                        <FormItem label="Pagination">
                            <Switch checked={state.pagination} onChange={this.handleToggle('pagination')}/>
                        </FormItem>
                        <FormItem label="Title">
                            <Switch checked={!!state.title} onChange={this.handleTitleChange}/>
                        </FormItem>
                        <FormItem label="Column Header">
                            <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange}/>
                        </FormItem>
                        <FormItem label="Footer">
                            <Switch checked={!!state.footer} onChange={this.handleFooterChange}/>
                        </FormItem>
                        <FormItem label="Expandable">
                            <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange}/>
                        </FormItem>
                        <FormItem label="Checkbox">
                            <Switch
                                checked={!!state.rowSelection}
                                onChange={this.handleRowSelectionChange}/>
                        </FormItem>
                        <FormItem label="Fixed Header">
                            <Switch checked={!!state.scroll} onChange={this.handleScollChange}/>
                        </FormItem>
                        <FormItem label="Size">
                            <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                                <Radio.Button value="default">Default</Radio.Button>
                                <Radio.Button value="middle">Middle</Radio.Button>
                                <Radio.Button value="small">Small</Radio.Button>
                            </Radio.Group>
                        </FormItem>
                    </Form>
                </div>
                <Table {...this.state} columns={columns} dataSource={data} scroll={{
                    x: '120%',
                    y: 240
                }}/>
            </div>
        );
    }
}

export default AndtTable1;