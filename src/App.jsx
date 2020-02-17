import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from 'react-redux';
import Navigation from "./partials/Navigation"
import store from "./redux/store"
import { Layout, Skeleton, Result } from 'antd'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/client'
import PrivateRoute from './components/PrivateRoute'
import './App.css'


const Home = React.lazy(() => import("./pages/Home.jsx"))
const Form = React.lazy(() => import("./pages/Form.jsx"))

class App extends React.Component {
	render() {
		return (
			<Layout>
				<Provider store={store}>
					<ApolloProvider client={client}>
						<Router>
							<Suspense fallback={<Skeleton active  />}>
								<Layout.Header>
									<Navigation />
								</Layout.Header>
								<Layout>
									<Layout.Content
										style={{
											background: '#fff',
											padding: 24,
											margin: 0,
											minHeight: window.innerHeight - 130,
										}}
									>
										<Switch>
											<Route path="/login" component={Form} />
											<PrivateRoute path="/" component={Home} exact />
											<Route path="*">
												<Result status="404" title="Lost!" />
											</Route>
										</Switch>
									</Layout.Content>
								</Layout>
								<Layout.Footer style={{ textAlign: 'center' }}>wdfvb</Layout.Footer>
							</Suspense>
						</Router>
					</ApolloProvider>
				</Provider>
			</Layout>
		);
	}
}
export default App;
