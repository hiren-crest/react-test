import React from 'react'
import { connect } from 'react-redux';
import {Typography } from 'antd';

class Header extends React.Component {
   componentDidMount() {
		document.title = this.props.title
	}
   render() {
      return (
        <Typography.Title>
            {this.props.title} {this.props.auth?.name}
            {this.props.children}
        </Typography.Title>
      );
   }
}

export default connect(state => ({auth: state.auth}))(Header)