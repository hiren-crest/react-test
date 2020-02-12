import React from 'react';
import { Drawer, Input, Form, Button, message } from 'antd';
import gql from 'graphql-tag'
import { print } from 'graphql'
import axios from 'axios'

class UserForm extends React.Component {

    submit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((error, values) => {
            if(!error) {
                this.createUser(values)
            }
        });
    }

    createUser = (form) => {
        const query = gql`
            mutation {
                createUser (email: "${form.email}", password: "${form.password}", title: "${form.title}", name: "${form.name}") { 
                    email, name
                }
            }
        `
        axios.post('http://localhost:4000', {query: print(query)}).then(({data}) => {
            if(data.data && !data.data.createUser) {
                message.error(data.errors[0].message)
            } else {
                message.success(`Welcome ${data.data.createUser.name}!`)
                this.props.onClose()
                this.props.refresh()
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Drawer
                width={520}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Form layout="vertical" onSubmit={this.submit}>
                    <Form.Item label="Name">
                    {
                        getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(<Input placeholder="Please enter name" />)
                    }
                    </Form.Item>
                    <Form.Item label="Email">
                        {
                            getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(<Input type="email" placeholder="Please enter email" />)
                        }
                    </Form.Item>
                    <Form.Item label="Password">
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(<Input.Password placeholder="Please enter password" />)
                        }
                    </Form.Item>
                    <Form.Item label="Title">
                    {
                            getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input title!' }],
                            })(<Input placeholder="Please enter title" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create User
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        );
    }
}
UserForm = Form.create()(UserForm);
export default UserForm