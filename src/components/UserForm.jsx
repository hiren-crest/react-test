import React from 'react';
import { Drawer, Input, Form, Button } from 'antd';
import { connect } from 'react-redux'
import UserQueries from '../queries/users'

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
        if(this.props.editData.id) {
            form.id = this.props.editData.id
        }
        this.props.dispatch({
            type: 'CREATE_USER_ASYNC',
            payload: {
                mutation: UserQueries.create,
                variables: form
            },
            onSuccess: this.props.onClose
        })
        // axios.post('http://localhost:4000', {query: UserQueries.create, variables: form}).then(({data}) => {
        //     if(data.data && !data.data.createUser) {
        //         message.error(data.errors[0].message)
        //     } else {
        //         message.success(`${data.data.createUser.name} ${this.props.editData.id ? 'updated' : 'added'} successfully!`)
        //         this.props.onClose()
        //         this.props.refresh()
        //     }
        // })
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
                            initialValue: this.props.editData.name,
                        })(<Input placeholder="Please enter name" />)
                    }
                    </Form.Item>
                    <Form.Item label="Email">
                        {
                            getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                initialValue: this.props.editData.email,
                            })(<Input type="email" placeholder="Please enter email" />)
                        }
                    </Form.Item>
                    <Form.Item label="Password">
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: !this.props.editData.id, message: 'Please input your password!' }],
                            })(<Input.Password placeholder="Please enter password" />)
                        }
                    </Form.Item>
                    <Form.Item label="Title">
                    {
                            getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input title!' }],
                                initialValue: this.props.editData.title,
                            })(<Input placeholder="Please enter title" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {this.props.editData.id ? 'Update' : 'Create'} User
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        );
    }
}
UserForm = Form.create({
    mapPropsToFields(props) {
        return {}
    }
})(UserForm);
export default connect(state => (state))(UserForm)