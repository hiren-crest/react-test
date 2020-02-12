import React from 'react'
import { connect } from 'react-redux';

class Header extends React.Component {
   componentDidMount() {
		document.title = this.props.title
	}
   render() {
      return (
        <h1 className="site-heading">
            {this.props.title} {this.props.auth.name}
            {this.props.children}
        </h1>
      );
   }
}

export default connect(state => ({auth: state.auth}))(Header)