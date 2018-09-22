const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const mongo = require("mongodb");
// TODO: This should probably be in a more central location that both Query and Mutations can use
const { ActivityFields } = require("./types/tiersActivityTypes");

const createMutationsWithDB = db =>
  new GraphQLObjectType({
    name: "Mutations",
    fields: {
      addActivityRatings: {
        type: new GraphQLObjectType({
          name: "RatingFromMutations",
          fields: ActivityFields(db, "Mutation")
        }),
        args: {
          activityId: { type: GraphQLNonNull(GraphQLString) },
          friendId: { type: GraphQLNonNull(GraphQLString) },
          itemRatings: {
            type: GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (_, { activityId, friendId, itemRatings }) => {
          const itemRatingsJSON = JSON.parse(itemRatings);
          // TODO: Error handling for when insertion does not work
          await db.collection("activityRatings").insertOne({
            activityId,
            friendId,
            itemRatings: itemRatingsJSON
          });

          const activitiesCollection = db.collection("activities");
          const activity = await activitiesCollection.findOne({
            _id: new mongo.ObjectID(activityId)
          });
          console.log("activity", activity);
          return activity;
        }
      },
      deleteActivityRatings: {
        type: new GraphQLObjectType({
          name: "DeleteActivityRating",
          fields: {
            // TODO: Add field for unsuccessful deletion?
            ...ActivityFields(db, "MutationDeleteActivityRating")
          }
        }),
        args: {
          activityId: { type: GraphQLNonNull(GraphQLString) },
          friendId: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_, { activityId, friendId }) => {
          // TODO: Error handling for when insertion does not work
          const deletedResult = await db
            .collection("activityRatings")
            .deleteOne({
              activityId,
              friendId
            });

          /*
            TODO: Throw error or return value if deletedCount is 0
          console.log("deletedResult", deletedResult);
          console.log("deletedCount", deletedResult.deletedCount);
          */

          const activitiesCollection = db.collection("activities");
          const activity = await activitiesCollection.findOne({
            _id: new mongo.ObjectID(activityId)
          });
          return activity;
        }
      }
    }
  });

module.exports = {
  createMutationsWithDB
};
