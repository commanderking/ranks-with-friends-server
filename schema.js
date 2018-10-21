const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { FriendRatings } = require("./TestData");
const {
  TierActivity,
  Friend,
  Activity
} = require("./types/tiersActivityTypes");
const { mutation } = require("./mutations");
const mongo = require("mongodb");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    getTiersActivity: {
      type: new GraphQLList(TierActivity),
      deprecationReason: "Uses hardcoded test data",
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
      resolve: async (_, { id }, { db }) => {
        const friendsCollection = db.collection("friends");
        return await friendsCollection.findOne({
          _id: new mongo.ObjectID(id)
        });
      }
    },
    activity: {
      type: Activity,
      args: {
        activityId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { activityId }, { db }) => {
        const activitiesCollection = db.collection("activities");
        const activity = await activitiesCollection.findOne({
          _id: new mongo.ObjectID(activityId)
        });
        return activity;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query,
  mutation
});

module.exports = {
  schema
};
