import React, { Suspense } from 'react';
import Header from '../partials/Header.jsx'
import {Redirect} from "react-router-dom"
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Skeleton } from 'antd'
import { loginUser } from '../queries/users'

class Form extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            head: "Login",
            test: "testing",
            email: '',
            password: ''
        };
        this.testing_login = this.testing_login.bind(this)
    }
    passwordField = React.createRef()

    testing_login() {
        this.props.dispatch({
            type: 'LOGIN_ASYNC',
            payload: {
                mutation: loginUser,
                variables: {
                    email: this.state.email,
                    password: this.state.password
                }
            }
        })
    }

    render() {
        return (
            <>
                {this.props.auth ? (<Redirect to="/" />) : 
                    (
                        <>
                            <Suspense fallback={<Skeleton />}>
                                <Header title={this.state.head} align="center" />
                            </Suspense>
                            <Suspense fallback={<Skeleton />}>
                                <Row justify="center" type="flex">
                                    <Col span={6}>
                                        <Row gutter={[16,16]}>
                                            <Col span={24}>
                                                <Input
                                                    type="email"
                                                    placeholder="input email"
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({ email: e.target.value }) }
                                                    onPressEnter={() => this.passwordField.current.focus()}
                                                    allowClear={true}
                                                />
                                            </Col>
                                            <Col span={24}>
                                                <Input.Password
                                                    placeholder="Enter password"
                                                    ref={this.passwordField}
                                                    value={this.state.password}
                                                    onChange={(e) => this.setState({ password: e.target.value }) }
                                                    onPressEnter={this.testing_login}
                                                    allowClear={true}
                                                />
                                            </Col>
                                            <Col span={24}>
                                                <Button type="primary" icon="login" onClick={this.testing_login}>Login</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Suspense>
                        </>
                    )
                }
            </>
        )
    }
}
export default connect(state => (state))(Form)