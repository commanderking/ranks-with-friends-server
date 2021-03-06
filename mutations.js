const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
// TODO: This should probably be in a more central location that both Query and Mutations can use
const { createActivity } = require("./fields/activity");

const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addActivityRatings: {
      type: new GraphQLObjectType({
        name: "RatingFromMutations",
        fields: {
          insertedId: { type: GraphQLString },
          insertedCount: { type: GraphQLString }
        }
      }),
      args: {
        activityId: { type: GraphQLNonNull(GraphQLString) },
        friendId: { type: GraphQLNonNull(GraphQLString) },
        itemRatings: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (_, { activityId, friendId, itemRatings }, { db }) => {
        const itemRatingsJSON = JSON.parse(itemRatings);
        // TODO: Error handling for when insertion does not work
        const insertedItem = await db.collection("activityRatings").insertOne({
          activityId,
          friendId,
          itemRatings: itemRatingsJSON
        });
        return {
          insertedId: insertedItem.insertedId.toString(),
          insertedCount: insertedItem.insertedCount
        };
      }
    },
    deleteActivityRatings: {
      type: new GraphQLObjectType({
        name: "DeleteActivityRating",
        fields: {
          deletedCount: { type: GraphQLString }
        }
      }),
      args: {
        activityId: { type: GraphQLNonNull(GraphQLString) },
        friendId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { activityId, friendId }, { db }) => {
        // TODO: Error handling for when insertion does not work
        const deletedResult = await db.collection("activityRatings").deleteOne({
          activityId,
          friendId
        });

        return {
          deletedCount: deletedResult.deletedCount
        };
      }
    },
    updateActivityRatings: {
      type: new GraphQLObjectType({
        name: "UpdateActivityRatings",
        fields: {
          matchedCount: { type: GraphQLString }
        }
      }),
      args: {
        activityId: { type: GraphQLNonNull(GraphQLString) },
        friendId: { type: GraphQLNonNull(GraphQLString) },
        itemRatings: {
          type: GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (_, { activityId, friendId, itemRatings }, { db }) => {
        const itemRatingsJSON = JSON.parse(itemRatings);
        // TODO: Error handling for when insertion does not work
        console.log("itemRatingsJson", itemRatingsJSON);
        const updatedItem = await db.collection("activityRatings").updateOne(
          {
            activityId,
            friendId
          },
          {
            $set: {
              itemRatings: itemRatingsJSON
            }
          }
        );
        console.log("updatedItem", updatedItem);
        return updatedItem.matchedCount;
      }
    },
    createActivity: createActivity()
  }
});

module.exports = {
  mutation
};
