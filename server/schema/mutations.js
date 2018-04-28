const graphql = require('graphql');
const {
	GraphQLObjectType, 
	GraphQLString
} = graphql; 

const userType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		logout: {
			type: userType, // return type
			resolve(parentValue, args, req){
				const user = req.user;
				req.logout();
				return user;
			}

		},
		signup: {
			type: userType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password }, req){ // request or context is request object from express
				return AuthService.signup({ email, password, req });
			}
		},

		login: {
			type: userType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password }, req){ // request or context is request object from express
				return AuthService.login({ email, password, req });
			}
		}
	}
});

module.exports = mutation;