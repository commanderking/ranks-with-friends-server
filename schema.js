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
var mongo = require("mongodb");

const createQueryWithDB = db =>
  new GraphQLObjectType({
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
      friend: {
        type: Friend,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async (_, { id }) => {
          const friendsCollection = db.collection("friends");
          return await friendsCollection.findOne({
            _id: new mongo.ObjectID(id)
          });
        }
      },
      activity: {
        type: Activity(db),
        args: {
          activityId: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_, { activityId }) => {
          const activitiesCollection = db.collection("activities");
          const activity = await activitiesCollection.findOne({
            _id: new mongo.ObjectID(activityId)
          });
          return activity;
          /*
          const activitiesForFriend = activities.filter(
            activity => activity.activityId === activityId
          );
          return {
            ...activitiesForFriend[0],
            activityRatings
          };
          */
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

const generateSchemaWithDB = db =>
  new GraphQLSchema({ query: createQueryWithDB(db) });

module.exports = {
  generateSchemaWithDB
};
