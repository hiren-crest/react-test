import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom"


function PrivateRoute ({component: Component, ...rest}) {
    return (
            <Route
                {...rest}
                render={props => (
                    rest.auth
                    ? <Component {...props} {...rest} />
                    : <Redirect to={{ pathname: '/login', state: { from: props.location  }}} />
                )}
            />
    );
}

export default connect(state => (state))(PrivateRoute)