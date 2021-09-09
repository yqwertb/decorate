import React from "react";
import {ConfigProvider} from "antd";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import App from "../App";
import Wrapper from "../components/wrapper";
import Login from "../views/login/index";
import Home from "../views/home/index";
import Users from "../views/users/index";
import Order from "../views/order/index";
import zhCN from 'antd/lib/locale/zh_CN';



export default class RouterComponent extends React.Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <ConfigProvider locale={zhCN}>
                        <App>
                            <Switch>
                                <Wrapper>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/users" component={Users}/>
                                    <Route path="/order" component={Order}/>
                                </Wrapper>
                                <Route path="/login" component={Login}/>
                            </Switch>
                        </App>
                    </ConfigProvider>
                </BrowserRouter>
            </>
        )
    }
}