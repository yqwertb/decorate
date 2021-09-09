import React from "react";
import {Layout} from "antd";
import logoUrl from "../../../resource/logo.svg"
import {NavLink} from "react-router-dom";
const {Header} = Layout;

const HeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
}
export default class WrapperHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        }
    }
    componentWillMount() {
        let userInfo = {}
        userInfo.username = sessionStorage.getItem('username');
        userInfo.name = sessionStorage.getItem('name');
        userInfo.img = sessionStorage.getItem('img');
        userInfo.rid = sessionStorage.getItem('rid');
        userInfo.phone = sessionStorage.getItem('phone');
        userInfo.token = sessionStorage.getItem('token');
        this.setState({
            userInfo
        })
    }
    componentWillUnmount() {
        sessionStorage.clear()
        this.setState({
            userInfo: null
        })
    }

    render() {
        const {userInfo} = this.state
        return (
            <Header style={HeaderStyle} className="header">
                    <div id="header-left">
                        <img src={logoUrl} alt="logo" className="logo"/>
                        <div id="header-title">装修小程序后台管理平台</div>
                    </div>
                    <div id="header-right">
                        <div id="header-username">你好，{userInfo.name}</div>
                        <div id="header-userimg">
                            <img src={userInfo.img} alt="头像"/>
                        </div>
                        <NavLink to="/login">注销</NavLink>
                    </div>
                </Header>
        )
    }

}