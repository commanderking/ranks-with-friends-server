const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const {
  FriendRatings,
  friends,
  activities,
  activityRatings
} = require("./TestData");
const {
  TierActivity,
  Friend,
  Activity,
  Rating,
  RatingWithFriendData
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
    activity: {
      type: Activity,
      args: {
        activityId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { activityId }) => {
        const activitiesForFriend = activities.filter(
          activity => activity.activityId === activityId
        );
        return {
          ...activitiesForFriend[0],
          activityRatings
        };
      }
    },
    ratings: {
      type: new GraphQLList(RatingWithFriendData),
      args: {
        activityId: { type: GraphQLString }
      },
      // TODO: When database comes in, will need to filter by activityId
      resolve: (_, { activityId }) => {
        return activityRatings;
      }
    }
  }
});

const schema = new GraphQLSchema({ query: queryType });

module.exports = {
  schema
};
