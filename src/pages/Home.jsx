import React, { Suspense } from 'react';
import Header from '../partials/Header.jsx'
import {Redirect} from "react-router-dom"
import { logout, LOGOUT } from '../redux/actions'
import { connect } from 'react-redux';
import { getAuth } from '../redux/selectors'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import { Card, Button, Tag } from 'antd';
import UserForm from '../components/UserForm.jsx';
import UserTable from '../components/UserTable.jsx';

class Home extends React.Component {
	state = {
		head: "Heading",
		test: "testing",
		visible: false,
		query: gql`{
			users {
				name
				email
				id
				title
			}
		}`,
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
				render: title => (
					<Tag color={this.state.colors[Math.floor(Math.random() * 11)]} key={title}>
						{title}
					</Tag>
				)
			},
		]
	}
	componentDidMount() {
	}
	render() {
		return (
			<Card>
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

				<Query query={this.state.query}>
					{({ loading, data, refetch }) => {
						if(loading) return <p>Loading...</p>;
						return (
							<>
								<UserForm
									onClose={() => { this.setState({visible: false}) }}
									visible={this.state.visible}
									refresh={refetch}
								/>
								<UserTable users={data.users} columns={this.state.columns} />
							</>
						);
					}}
				</Query>
			</Card>
		)
	}
}
export default connect(state => ({auth: getAuth(state)}))(Home)