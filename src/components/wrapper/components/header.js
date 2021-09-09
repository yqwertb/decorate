import React from "react";
import {Layout} from "antd";

const {Header} = Layout;

const HeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    // width: '100%'
}
export default class WrapperHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Header style={HeaderStyle} className="header">
                    <div id="header-left">
                        <div id="logo">
                            <img src={''} alt="logo"/>
                        </div>
                        <div id="header-title">装修小程序后台管理平台</div>
                    </div>
                    <div id="header-right">
                        <div id="header-username">dfd</div>
                        <div id="header-userimg">
                            <img src={''} alt="头像"/>
                        </div>
                    </div>
                </Header>
        )
    }

}