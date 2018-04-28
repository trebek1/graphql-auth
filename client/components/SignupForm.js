import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../query/CurrentUser';
import { graphql } from 'react-apollo';

class SignupForm extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			errors: []
		};
	}

	onSubmit(email, password){

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
				<h3> Signup </h3>
				<AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
			</div>
		);
	}
}

export default graphql(mutation)(SignupForm);