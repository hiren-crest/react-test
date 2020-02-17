import React, { Suspense } from 'react';
import Header from '../partials/Header.jsx'
import {Redirect} from "react-router-dom"
import { logout, LOGOUT } from '../redux/actions'
import { connect } from 'react-redux';
import { Button, Tag, Popconfirm } from 'antd';
import UserForm from '../components/UserForm.jsx';
import UserTable from '../components/UserTable.jsx';
import UserQueries from '../queries/users'

class Home extends React.Component {
	state = {
		head: "Heading",
		test: "testing",
		visible: false,
		colors: [
			'geekblue',
			'green',
			'volcano',
			'magenta',
			'orange',
			'gold',
			'lime',
			'green',
			'cyan',
			'blue',
			'purple'
		],
		columns: [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: 'Title',
				dataIndex: 'title',
				key: 'title',
				className: 'text-center',
				render: title => (
					<Tag color={this.state.colors[Math.floor(Math.random() * 11)]} key={title}>
						{title}
					</Tag>
				)
			},
			{
				title: 'Action',
				key: 'action',
				className: 'text-center',
				render: (text, record) => (
					this.props.auth?.email === record.email
						? ''
						: <Button.Group>
							<Button type="primary" ghost={true} onClick={() => this.editRecord(record)} size="small" icon="edit" />
							<Popconfirm
								placement="topRight"
								onConfirm={() => this.deleteRecord(record)}
								title="Are you sure delete this user?"
								okText="Yes"
    							cancelText="No"
							>
								<Button type="danger"  ghost={true} size="small" icon="delete" />
							</Popconfirm>
						</Button.Group>
				  ),
			}
		],
		editdata: {}
	}
	editRecord = (record) => {
		this.setState({
			visible: true,
			editdata: record
		})
	}
	componentDidMount() {
		this.fetch()
	}
	fetch() {
		this.props.dispatch({
			type: 'GET_USERS_ASYNC',
			payload: {
				query: UserQueries.fetch
			}
		})
	}
	deleteRecord = (record) => {
		this.props.dispatch({
			type: 'DELETE_USER_ASYNC',
			payload: {
				mutation: UserQueries.delete,
				variables: {
					id: record.id
				}
			}
		})
	}
	render() {
		return (
			<>
				<Suspense fallback={<div>Loading... </div>}>
					<Header title={this.state.head}>
						{!this.props.auth ? (<Redirect to="/login" />) : (
							<>
								<Button
									onClick={() => {
										this.props.dispatch(logout(LOGOUT))
									}}
									ghost={true}
									size="small"
									shape="round"
									type="danger"
									icon="logout"
									style={{float: 'right'}} 
								>
									Logout
								</Button>
								<Button
									onClick={() => {
										this.setState((state) => { return {visible: !state.visible} })
									}}
									ghost={true}
									size="small"
									shape="round"
									type="primary"
									style={{float: 'right', marginRight: '10px'}} 
								>
									Add
								</Button>
							</>
						)}
					</Header>
				</Suspense>
				<UserForm
					onClose={() => { this.setState({visible: false, editdata: {} }) }}
					visible={this.state.visible}
					editData={this.state.editdata}
				/>
				<UserTable users={this.props.users} columns={this.state.columns} />
			</>
		)
	}
}
export default connect(state => (state))(Home)