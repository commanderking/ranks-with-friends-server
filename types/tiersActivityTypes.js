const {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLEnumType
} = require("graphql");

const friendScore = new GraphQLObjectType({
  name: "FriendScore",
  fields: {
    name: { type: GraphQLString },
    score: { type: GraphQLString }
  }
});

const TierActivity = new GraphQLObjectType({
  name: "FriendCategory",
  fields: {
    // TODO: rename books --> category once testData has changed over
    friend: { type: GraphQLString },
    books: { type: new GraphQLList(friendScore) }
  }
});

module.exports = {
  friendScore,
  TierActivity
};
