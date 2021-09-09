import React from "react";
import {Table, Space, Button} from "antd";
import moment from "moment";
import 'moment/locale/zh-cn';
import {
    FormOutlined,
    DeleteOutlined
} from "@ant-design/icons";



const pagination = {
    pageSize: 8,
    showTotal(total) {
        // let pageNum = Math.ceil(total / this.defaultPageSize);
        return `共${total}条数据`
    }
};

export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
        }
    }

    onSelectChange(keys, rows) {
        this.setState({
            selectedRowKeys: keys
        })
    }

    render() {
        const {selectedRowKeys} = this.state;
        const {data, dataHandle, bundleDelete} = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: (keys, rows) => {
                this.onSelectChange(keys, rows)
                bundleDelete(keys)
            },
        }
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                align: 'center'
            },
            {
                title: '昵称',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                align: 'center'
            },
            {
                title: '权限',
                dataIndex: 'role',
                align: 'center',
                render(record) {
                    let res;
                    switch (record) {
                        case 1:
                            res = '超级管理员';
                            break;
                        case 2:
                            res = '管理员';
                            break;
                        case 3:
                            res = '编辑';
                            break;
                    }
                    return res;
                }
            },
            {
                title: '最后登录时间',
                dataIndex: 'lastLogin',
                align: 'center',
                render(record) {
                    if(!record) {
                        return '暂未登录'
                    }
                    record = new Date(+ new Date(record) - 8*3600*1000).toISOString()
                    return (
                        moment(record).format('lll')
                    );
                }
            },
            {
                title: '操作',
                align: 'center',
                render(record) {
                    return (
                        <Space>
                            <Button onClick={() => dataHandle('edit', record)}
                                    icon={<FormOutlined />}
                                    type="primary"
                            >修改</Button>
                            <Button onClick={() => dataHandle('delete', record.id)}
                                    icon={<DeleteOutlined />}
                                    type="primary" danger
                            >删除</Button>
                        </Space>
                    )
                }
            }
        ];
        return (
            <Table
                dataSource={data}
                bordered
                rowKey={ record =>record.id }
                rowSelection={ rowSelection }
                columns={columns}
                pagination={pagination}
            />

        );
    }

}
