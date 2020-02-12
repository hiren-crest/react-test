import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getAuth } from '../redux/selectors'
import { Menu } from 'antd'

class Navigation extends React.Component {
   render() {
       
        return (
            <Menu
                theme="dark"
                mode="horizontal"
            >
                <Menu.Item>
                    <Link to="/">Home</Link>
                </Menu.Item>
                {!this.props.auth ? (
                    <Menu.Item>
                        <Link to="/login">Form</Link>
                    </Menu.Item>
                ) : ''}
            </Menu>
        )
   }
}
export default connect(state => ({auth: getAuth(state)}))(Navigation)