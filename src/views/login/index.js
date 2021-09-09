import React from "react";
import { Button, Form, Input, Row, Col, message, Modal} from "antd";
import { UserOutlined,LockOutlined} from "@ant-design/icons";
import "../../style/login.css"

import {login, register} from "../../network/login"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            registerVisible: false,
            loginRef: React.createRef(),
            regRef: React.createRef()
        }
    }

    register()  {
        this.setState({
            registerVisible: true
        })
    }

    userLogin() {
        this.state.loginRef.current.validateFields().then(res => {
            login(res).then(result => {
                let userInfo = result.data.data
                let code = result.data.meta.status
                if(code === 200) {
                    sessionStorage.setItem('username', userInfo.username);
                    sessionStorage.setItem('name', userInfo.name);
                    sessionStorage.setItem('img', userInfo.img);
                    sessionStorage.setItem('rid', userInfo.rid);
                    sessionStorage.setItem('phone', userInfo.phone);
                    sessionStorage.setItem('token', userInfo.token);
                    this.props.history.push('/')
                }
            })
        })
    }

    render() {
        const { registerVisible, loginRef, regRef } = this.state

        return (
            <div>
                <section className={'login-content'}>
                    <h2 className={'h2'}>用户登录</h2>
                    <Form ref={ loginRef }>
                        <Row>
                            <Col span={ 24 }>
                                <Form.Item
                                    name="username"
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            }
                                        ]
                                    }
                                >
                                    <Input prefix={ <UserOutlined/> }
                                           style={{ color:'rgba(0,0,0,.25'}}
                                           placeholder={'用户名(默认123)'}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 24 }>
                                <Form.Item
                                    name='password'
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            }
                                        ]
                                    }
                                >
                                    <Input.Password
                                        prefix={ <LockOutlined/>} style={{ color:'rgba(0,0,0,.25'}}
                                        placeholder={'密码(默认123456)'}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 24 }>
                                <Form.Item>
                                    <Button type={'primary'} className={'login-form-button'}
                                            onClick={ this.userLogin.bind(this) }
                                    >登录</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 24 }>
                                <Form.Item>
                                    <Button type={'primary'} className={'login-form-button'}
                                            disabled={true}
                                            onClick={ this.register.bind(this) }
                                    >注册</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </section>
                <Modal
                    title={
                        <div style={{ width: '100%' }}>
                            用户注册
                        </div>
                    }
                    visible={ registerVisible }  //对话框是否可见
                    onCancel={ ()=> { //点击'取消'按钮,对话框关闭
                        this.setState({
                            registerVisible: false
                        })}
                    }
                    cancelText={'取消'}
                    onOk={() => {
                        console.log(1);}
                    }
                    okType={'primary'} //'注册'按钮的样式
                    okText={'注册'}
                    destroyOnClose  //关闭对话框后，是否对话框的资源
                >
                    <Form className='invitecode' preserve={false} ref={ this.regRef }>
                        <Form.Item
                            label="用&nbsp;&nbsp;户&nbsp;&nbsp;名"
                            name="userName"
                            rules={[{
                                required: true,
                                message: '请输入用户名'
                            }]}
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item
                            label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码"
                            name="userPwd"
                            rules={[{
                                required: true,
                                message: '请输入密码'
                            }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item
                            label="确认密码"
                            name="confirmPwd"
                            rules={
                                [
                                    {
                                        required: true,
                                        message:'确认密码不能为空'
                                    },
                                    {  //进行两次输入验证,参数'value'表示的当前表单项的值
                                        validator: (rules,value)=> {
                                            //获取第一次输入密码
                                            let userPwd = regRef.current.getFieldValue('userPwd')
                                            //进行验证
                                            if (userPwd && userPwd !== value){
                                                return Promise.reject('两次密码不一致')
                                            }else{
                                                return Promise.resolve()
                                            }
                                        }
                                    }
                                ]
                            }
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="确认密码"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

}
