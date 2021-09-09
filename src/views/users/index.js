import React from "react";
import {Button, message, Modal} from "antd";
import UserTable from "./components/userTable";
import AddModal from "./components/addModal";
import EditModal from "./components/editModal";
import {adminList, addAdmin, deleteAdmin, bundleDelete} from "../../network/admin";

export default class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            addUser: false,
            editUser: false,
            editItem: null,
            deleteUser: false,
            deleteId: null,
            bundleIds: []
        }
    }

    componentDidMount() {
        this.getAdminList()
    }

    getAdminList() {
        adminList().then(res => {
            this.setState({
                data: res.data.data,
            })
        });
    }

    addAdmin(data) {
        addAdmin(data).then(res => {
            this.getAdminList()
            message.success('创建成功')
            this.setState({
                addUser: false,
            })
        });
    }

    deleteAdmin() {
        let id = this.state.deleteId
        let ids = this.state.bundleIds
        if(id) {
            deleteAdmin(id).then(res => {
                this.getAdminList()
                message.success('删除成功')
                this.setState({
                    deleteUser: false,
                    deleteId: null
                })
            })
        } else if (ids.length) {
            bundleDelete(ids).then(res => {
                this.getAdminList()
                message.success('删除成功')
                this.setState({
                    deleteUser: false,
                    bundleIds: []
                })
            })
        }

    }

    getBundleDelete(keys) {
        this.setState({
            bundleIds: keys
        }, () => {
            console.log(this.state.bundleIds);
        })

    }

    ModalClose(type, newData) {
        this.setState({
            [type]: newData
        })
    }

    okHandle(type, data) {
        if(type === 'addUser') {
            this.addAdmin(data)
        }
    }

    dataHandle(flag, ...arg) {
        if(flag === 'edit') {
            this.setState({
                editUser: true,
                editItem: arg[0]
            });
        } else {
            this.setState({
                deleteUser: true,
                deleteId: arg[0]
            })
        }
    }


    render() {
        const {addUser, editUser, deleteUser, editItem, deleteId, data, bundleIds} = this.state;
        return (
            <>
                {/*头部的操作*/}
                <div style={{marginBottom: '15px'}}>
                    <Button type="primary" style={{marginRight: 8}}
                            onClick={() => {
                                this.setState({
                                    addUser: true
                                })
                            }}
                    >添加用户</Button>
                    <Button type="danger"
                            disabled={bundleIds.length === 0}
                            onClick={() => {
                                this.setState({
                                    deleteUser: true
                                })
                            }}
                    >批量删除</Button>
                </div>
                <UserTable data={data}
                           dataHandle={(flag, ...arg) => {
                                this.dataHandle(flag, ...arg);
                            }}
                           bundleDelete={(keys, rows) => {
                               this.getBundleDelete(keys, rows)
                           }}
                />
                {/*弹窗*/}
                <AddModal addUser={addUser}
                          addModalClose={(flag) => {
                            this.ModalClose('addUser', flag)
                          }}
                          okHandle={(data) => {
                              this.okHandle('addUser', data)
                          }}
                />
                <EditModal editUser={editUser} editItem={editItem}
                           editModalClose={(flag) => {
                               this.ModalClose('editUser', flag);
                           }}
                />
                <Modal
                    title="删除用户"
                    visible={deleteUser}
                    maskClosable={false}
                    destroyOnClose
                    centered
                    width='200'
                    onOk={() => {
                        this.deleteAdmin()
                    }}
                    onCancel={() => {
                        this.setState({
                            deleteUser: false,
                            deleteId: null,
                            bundleIds: []
                        })
                    }}
                >
                    <p style={{
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: '18px'
                    }}>是否要删除?</p>
                </Modal>
            </>
        );
    }

}
