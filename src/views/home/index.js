import React from "react";

export default class Home extends React.Component {
    isLogin = null
    constructor(props) {
        super(props);
        this.isLogin = sessionStorage.getItem('token')
    }
    componentDidMount() {
        if (!this.isLogin) {
            this.props.history.push('/login')
        }
    }

    render() {


        return (
            <div >
                <div>
                    index
                </div>
            </div>
        );
    }

}
