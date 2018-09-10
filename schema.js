const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = require("graphql");
const { BooksTiers } = require("./TestData");
const { TierActivity } = require("./types/tiersActivityTypes");

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    getTiersActivity: {
      type: new GraphQLList(TierActivity),
      args: {
        id: { type: GraphQLString }
      },
      resolve: function(_, { id }) {
        return BooksTiers;
      }
    }
  }
});

const schema = new GraphQLSchema({ query: queryType });

module.exports = {
  schema
};
