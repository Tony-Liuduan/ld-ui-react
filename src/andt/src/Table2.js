import React from 'react';
import {Table, Button} from 'antd';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park'
    }
];

class AndtTable2 extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null
    };
    // 分页、排序、筛选变化时触发 onChange, 注意：sortOrder不能触发
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({filteredInfo: filters, sortedInfo: sorter});
    }
    clearFilters = () => {
        this.setState({filteredInfo: null});
    }
    // 清空所有排序筛选
    clearAll = () => {
        this.setState({filteredInfo: null, sortedInfo: null});
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',  // ascend descend false
                columnKey: 'age'
            }
        });
    }
    render() {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe'
                    }, {
                        text: 'Jim',
                        value: 'Jim'
                    }
                ],
                filteredValue: filteredInfo.name || null,                      // 表格外btn控制筛选的中间人 值为已筛选的 value 数组	
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',                                                    // 排序必须有key
                sorter: (a, b) => a.age - b.age,                               // 当无外部按钮控制显示时，表格内部排序只写sorter就行
                sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order  // 用于表格外部控制排序属性，是与外部btn沟通的中间人
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                filters: [
                    {
                        text: 'London',
                        value: 'London'
                    }, {
                        text: 'New York',
                        value: 'New York'
                    }
                ],
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.address.includes(value),
                sorter: (a, b) => a.address.length - b.address.length,
                sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order 
            }
        ];
        return (
            <div>
                <div className="table-operations">
                    <Button onClick={this.setAgeSort}>Sort age</Button>
                    <Button onClick={this.clearFilters}>Clear filters</Button>
                    <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                </div>
                <Table columns={columns} dataSource={data} onChange={this.handleChange} />
            </div>
        );
    }
}

export default AndtTable2;