import React from 'react';
import {Cascader, Spin} from 'antd';

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false // 用于标记懒加载后一项，没有则不向后扩展
    }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        disabled: true,
        isLeaf: false
    }
];

class LazyOptions extends React.Component {
    state = {
        inputValue: '',
        options: [],
        loading: false
    };
    onChange = (value, selectedOptions) => {
        //console.log(value, selectedOptions);
        this.setState({
            inputValue: selectedOptions
                .map(o => o.label)
                .join(', ')
        });
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                }, {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2'
                }
            ];
            this.setState({
                options: [...this.state.options]
            });
        }, 1000);
    }

    onPopupVisibleChange = value => {
        if (value && this.state.options.length <= 0) {
            this.setState({
                loading: true
            });
            setTimeout(() => {
                this.setState({
                    options: [...options],
                    loading: false
                });
            }, 2000);
        }
    }

    render() {
        return (
            <div>
                <Spin spinning={this.state.loading}>
                <Cascader
                    options={this.state.options}
                    loadData={this.loadData}
                    onChange={this.onChange}
                    changeOnSelect
                    onPopupVisibleChange={this.onPopupVisibleChange} />
                </Spin>
            </div>
        );
    }
}

export default LazyOptions;