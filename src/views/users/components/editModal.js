import React from "react";
import {Modal, Form, Input, DatePicker, Button, Select } from "antd";

const { Option } = Select;
const { Password } = Input;

export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editItem: {
                id: '1'

            }
        }

    }


    static getDerivedStateFromProps(nextProps, nextState) {
        return {
            editItem: nextProps.editItem ? nextProps.editItem : {
                id: '1'
            }
        }
    }

    //对权限进行数字和汉字的转换
    roleFormat(num) {
        let role;
        switch (num) {
            case 1:
                role = '超级管理员';
                break;
            case 2:
                role = '管理员';
                break;
            case 3:
                role = '编辑';
                break;
        }
        return role
    }

    render() {
        const {editItem} = this.state;
        const {editUser, editModalClose} = this.props;

        return (
            <Modal
                title="修改信息"
                visible={editUser}
                centered
                maskClosable={false}
                destroyOnClose
                onCancel={() => {
                    editModalClose(false)
                }}
            >
                <Form
                    preserve={ false }
                    size="middle"
                >
                    <Form.Item
                        name="id"
                        label="编号"
                        initialValue={editItem.id}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="用户名"
                        initialValue={editItem.username}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="昵称"
                        initialValue={editItem.name}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        initialValue={editItem.password}
                        labelAlign="right"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="手机"
                        initialValue={editItem.phone}
                        labelAlign="right"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="权限"
                        initialValue={this.roleFormat(editItem.role)}
                        labelAlign="right"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select>
                            <Option value="1">超级管理员</Option>
                            <Option value="2">管理员</Option>
                            <Option value="3">编辑</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}