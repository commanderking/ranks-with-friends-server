const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require("graphql");

const ItemRatingFields = {
  name: { type: GraphQLString },
  score: { type: GraphQLString }
};

const createActivity = () => ({
  type: new GraphQLObjectType({
    name: "CreateActivityMutation",
    fields: {
      insertedId: { type: GraphQLString },
      insertedCount: { type: GraphQLString }
    }
  }),
  args: {
    friendId: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    ratingType: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    items: {
      type: GraphQLNonNull(GraphQLString)
      // This is what I want, but seems difficult to pass object
      /*
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: "Item",
          fields: ItemRatingFields
        })
      )
      */
    }
  },
  resolve: async (
    _,
    { friendId, title, ratingType, description, items },
    { db }
  ) => {
    const parsedItems = JSON.parse(items);
    // TODO: Error handling for when insertion does not work

    const insertedItem = await db.collection("activities").insertOne({
      friendId,
      title,
      ratingType,
      description,
      items: parsedItems
    });
    return {
      insertedId: insertedItem.insertedId.toString(),
      insertedCount: insertedItem.insertedCount
    };
  }
});

module.exports = {
  createActivity
};
