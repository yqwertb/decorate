import React from "react";
import {Layout} from "antd";
import WrapperHeader from "./components/header";
import WrapperContent from "./components/content";
import WrapperSider from "./components/sider";
import "../../style/wrapper.css"

// const {Header, Sider, Content} = Layout
export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Layout style={{height: '100vh'}}>
                <WrapperHeader/>
                <Layout>
                    <WrapperSider/>
                    <WrapperContent children={this.props.children}/>
                </Layout>
            </Layout>
        )
    }
}

