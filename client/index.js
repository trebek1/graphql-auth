import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import App from './components/App';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin' // safe to send along cookies
	}
});

const client = new ApolloClient({
	DataIdFromObject: o => o.id,
	networkInterface
});

const Root = () => {
  return (
  	<ApolloProvider client={client}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
      <Route path="login" component={LoginForm} />
      <Route path="signup" component={SignupForm} />
      <Route path="dashboard" component={requireAuth(Dashboard)} />
    	</Route>
    </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
