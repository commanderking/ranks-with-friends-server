const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = require("graphql");
const { FriendRatings, friends, activities } = require("./TestData");
const {
  TierActivity,
  Friend,
  Activity
} = require("./types/tiersActivityTypes");

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    getTiersActivity: {
      type: new GraphQLList(TierActivity),
      args: {
        id: { type: GraphQLString }
      },
      resolve: function(_, { id }) {
        return FriendRatings;
      }
    },
    friends: {
      type: new GraphQLList(Friend),
      args: {
        id: { type: GraphQLString }
      },
      resolve: (_, { id }) => {
        return friends.filter(friend => friend.id === id);
      }
    },
    activities: {
      type: new GraphQLList(Activity),
      args: {
        activityId: { type: GraphQLString }
      },
      resolve: (_, { activityId }) => {
        return activities.filter(
          activity => activity.activityId === activityId
        );
      }
    }
  }
});

const schema = new GraphQLSchema({ query: queryType });

module.exports = {
  schema
};
