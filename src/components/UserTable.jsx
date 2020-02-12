import React, { Component } from 'react'
import { Table } from 'antd';

export class UserTable extends Component {
    render() {
        return (
            <Table
                dataSource={this.props.users}
                columns={this.props.columns}
                rowKey="id"
                onChange={(e) => {console.log(e)}} 
                bordered
            />
        )
    }
}
export default UserTable
