import React from "react";
import {Layout} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const {Content, Header} = Layout;

const triggerStyle = {
    padding: '0 24px',
    fontSize: '18px',
    lineHeight: '64px',
    cursor: 'pointer',
    transition: 'color 0.3s'
}

export default class WrapperContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }

    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        // margin: '0 16px',
                        // marginLeft: '200px',
                        // minHeight: 900,
                        // padding: 24
                        // position: 'fixed',
                        // width: '100%'
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                }}>
                    {this.props.children}
                </Content>
            </Layout>
        )
    }

}