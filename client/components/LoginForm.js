import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../query/CurrentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class LoginForm extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			errors: []
		};
	}

	componentWillUpdate(nextProps){
		// this.props // the old props
		// nextProps // next set of props that will be in place when component rerenders 

		if(!this.props.data.user && nextProps.data.user){
			// redirect to dashboard 
			hashHistory.push('/dashboard');
		}
	}

	onSubmit(email, password){
		// cant add a .then to redirect to dashboard since 
		// the queries wont be refetched in time to know if user is logged in or not 
		this.props.mutate({
			variables: {
				email, password
			},
			refetchQueries: [{ query }]
		}).catch( err => {
			const errors = err.graphQLErrors.map(error => error.message);
			this.setState({
				errors
			});
		});
	}

	render(){

		return (
			<div>
				<h3> Login </h3>
				<AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
			</div>
		);
	}
}

export default graphql(query)(
	graphql(mutation)(LoginForm)
);