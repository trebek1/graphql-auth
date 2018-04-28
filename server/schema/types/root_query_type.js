const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType', 
  fields: { // each type needs to have a field 
  	// dummyField: { type: GraphQLID }
  	user: {
  		type: UserType,
  		resolve(parentValue, args, req){
  			return req.user;
  		}
  	}
  }
});

module.exports = RootQueryType;
