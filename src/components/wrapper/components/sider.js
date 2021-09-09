import React from "react";
import {Layout, Menu} from "antd";
import MenuList from "../../../config/menuList";
import {NavLink} from "react-router-dom";
import {
    HomeOutlined,
    UserOutlined,
    FileDoneOutlined
}  from '@ant-design/icons';

const {Sider} = Layout;

export default class WrapperSider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: false,
            selectMenu: sessionStorage.getItem('menuKey')
        }
    }
    MenuClick(item) {
        this.setState({
            selectMenu: item.key
        })
        sessionStorage.setItem('menuKey', item.key)
    }


    render() {
        let {isCollapse, selectMenu} = this.state
        let defaultSelectedKeys = selectMenu ? selectMenu : [MenuList[0].path]
        return (
            <Sider
                collapsed={isCollapse}
                collapsible
                theme="dark"
                trigger={null}
                className="site-layout-background"
            >
                <Menu
                    defaultSelectedKeys={defaultSelectedKeys}
                    mode="inline"
                    theme="dark"
                    style={{
                        height: `100%`,
                        borderRight: 0
                    }}
                    onClick={this.MenuClick.bind(this)}
                >
                    {
                        MenuList.map((item, index) => {
                            return (
                                <Menu.Item key={item.path}>
                                    <NavLink to={item.path}>
                                        {item.title}
                                    </NavLink>
                                </Menu.Item>

                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }

}