import React, { Component } from 'react'
import { Table } from 'antd';

export class UserTable extends Component {
    render() {
        return (
            <Table
                dataSource={this.props.users}
                columns={this.props.columns}
                rowKey="id"
                bordered
            />
        )
    }
}
export default UserTable
