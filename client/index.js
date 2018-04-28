import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';

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

    	</Route>
    </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
