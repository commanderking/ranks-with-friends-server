const { GraphQLList, GraphQLString, GraphQLObjectType } = require("graphql");

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
    title: { type: GraphQLString },
    ratings: { type: new GraphQLList(friendScore) }
  }
});

const Friend = new GraphQLObjectType({
  name: "Friend",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    image: { type: GraphQLString },
    myActivities: { type: new GraphQLList(GraphQLString) },
    friendActivities: { type: new GraphQLList(GraphQLString) },
    pendingActivities: { type: new GraphQLList(GraphQLString) }
  }
});

const ActivityItem = new GraphQLObjectType({
  name: "ActivityItem",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const Activity = new GraphQLObjectType({
  name: "Activity",
  fields: {
    activityId: { type: GraphQLString },
    title: { type: GraphQLString },
    ratingType: { type: GraphQLString },
    items: { type: new GraphQLList(ActivityItem) }
  }
});

module.exports = {
  friendScore,
  TierActivity,
  Friend,
  Activity
};
