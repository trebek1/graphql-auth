import React, { Component } from 'react';

class AuthForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	onSubmit(e){
		e.preventDefault();
		const { email, password } = this.state;
		console.log('submitting', email, password);
		this.props.onSubmit(email, password);
	}

	render(){
		return (
			<div className="row">
				<form className="col s6" onSubmit={(e) => this.onSubmit(e)}>
					<div className="input-field">
						<input placeholder="email" onChange={e => this.setState({email: e.target.value})} value={this.state.email} />
					</div>
					<div className="input-field">
						<input type="password" placeholder="password" onChange={e => this.setState({password: e.target.value})} value={this.state.password} />
					</div>
					<button className="btn">Submit</button>
				</form>
			</div>
		);
	}
}

export default AuthForm;