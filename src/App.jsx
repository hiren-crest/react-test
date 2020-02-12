import React, { Suspense } from "react"
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom"
import { Provider } from 'react-redux';
import Navigation from "./partials/Navigation.jsx"
import store from "./redux/store"
import { Layout, Skeleton, Result } from 'antd'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/client'


const Home = React.lazy(() => import("./pages/Home.jsx"))
const Form = React.lazy(() => import("./pages/Form.jsx"))

class App extends React.Component {
	state = {
		auth_status: false
	}
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
								<Layout.Content>
									<Switch>
										<Route path="/login" render={() => 
											!false ? <Form /> : 
												<Redirect to={{ pathname:"/" }} />
										} />
										<Route path="/" exact>
											<Home />
										</Route>
										<Route path="*">
											<Result status="404" title="Lost!" />
										</Route>
									</Switch>
								</Layout.Content>
							</Suspense>
						</Router>
					</ApolloProvider>
				</Provider>
			</Layout>
		);
	}
}
export default App;
