import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../query/CurrentUser';
import mutation from '../mutations/Logout';
import { Link } from 'react-router';

class Header extends Component {

	onLogoutClick(){
		this.props.mutate({
			refetchQueries: [ { query } ]
		});
	}

	renderButtons(){
		const { loading, user } = this.props.data;

		if(loading){
			return <div />;
		}

		if(user){
			return <li><a onClick={() => { this.onLogoutClick();}}> Logout </a></li>;
		} else {
			return (
				<div> 
					<li>
						<Link to="signup"> Signup </Link>
					</li>
					<li>
						<Link to="signin"> Login </Link>
					</li>
				</div>
			);
		}


	}

	render(){
		// backend graphql gotcha: graphiql works but frontend doesnt 
		// graphql does not attach cookies by default! 
		

		return <nav> 
			<div className="nav-wrapper"> 
				<Link to="/" className="brand-logo left">
					Home
				</Link>
				<ul className="right">
				{this.renderButtons()}
				</ul>
			</div>
		</nav>;
		
	};
}

export default graphql(mutation)(
graphql(query)(Header)
);