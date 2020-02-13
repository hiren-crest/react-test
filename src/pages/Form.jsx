import React, { Suspense } from 'react';
import Header from '../partials/Header.jsx'
import {Redirect} from "react-router-dom"
import { connect } from 'react-redux';
import { getAuth } from '../redux/selectors'
import { login } from '../redux/actions'
import { Button, Row, Col, Input, Skeleton, message } from 'antd'
import axios from 'axios'
import gql from 'graphql-tag'
import { print } from 'graphql'

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
        const query = gql`
            mutation {
                me (email: "${this.state.email}", password: "${this.state.password}") { 
                    email, name
                }
            }
        `
        axios.post('http://localhost:4000', {query: print(query)}).then(({data}) => {
            if(data.data && !data.data.me) {
                message.error(data.errors[0].message)
            } else {
                message.success(`Welcome ${data.data.me.name}!`)
                this.props.dispatch(login(data.data.me))
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
export default connect(state => ({auth: getAuth(state)}))(Form)