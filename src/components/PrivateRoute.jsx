import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom"


function PrivateRoute ({component: Component, ...rest}) {
    return (
        !this.props.auth ? 
            <Redirect to="/login" />
            :
            <Route {...rest}>
                <Component />
            </Route>
    );
}

export default connect(state => ({auth: state.auth}))(PrivateRoute)