import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Menu } from 'antd'
import { withRouter } from "react-router";

class Navigation extends React.Component {
    render() {
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                selectedKeys={[this.props.location.pathname]}
            >
                <Menu.Item key="/">
                    <Link to="/">Home</Link>
                </Menu.Item>
                {!this.props.auth ? (
                    <Menu.Item key="/login">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                ) : ''}
            </Menu>
        )
   }
}
export default withRouter(connect(state => ({auth: state.auth}))(Navigation))