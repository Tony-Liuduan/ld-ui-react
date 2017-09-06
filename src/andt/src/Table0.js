import React from 'react';
import {Table} from 'antd';
import reqwest from 'reqwest';
// 注意：fixed使用
    // 1.要在fetch之后.fixed
    // 2.必须保证有一个宽度不写，flex布局
let columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: name => name && `${name.first} ${name.last}`,
        width: 200
    }, {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        filters: [
            {
                text: 'Male',
                value: 'male'
            }, {
                text: 'Female',
                value: 'female'
            }
        ],
    }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 300
    }
];

class AndtTable extends React.Component {

    state = {
        data: [],
        pagination: {},
        loading: false
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({pagination: pager});
        this.fetch({
            results: pagination.pageSize,   // 请求页面的行数量
            page: pagination.current,       // 请求的页面
            sortField: sorter.field,        // 排序字段名
            sortOrder: sorter.order,        // 'ascend' 升序 'descend' 降序 false
            ...filters                      
        });
    }
    // 点击行时触发
    handleRowClick = (record, index, event) => {
        console.log(record, index, event);
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params
            },
            type: 'json'
        }).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            // Read total count from server pagination.total = data.totalCount;
            pagination.total = 100;
            columns[2].fixed = 'right';
            this.setState({loading: false, data: data.results, pagination});
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record.registered} // 表格行 key 的取值，可以是字符串或一个函数
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                onRowClick={this.handleRowClick}
                bordered={true} // 显示边框 默认false
                showHeader={true} // 显示表头 默认true
                scroll={{ x: "120%", y: true }} // true 为不滚动，高度自适应，值为容器高度可滚动
            />
        );
    }
}

export default AndtTable;