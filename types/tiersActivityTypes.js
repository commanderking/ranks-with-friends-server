const { GraphQLList, GraphQLString, GraphQLObjectType } = require("graphql");
const {
  FriendRatings,
  friends,
  activities,
  activityRatings
} = require("../TestData");

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

const FriendFields = {
  id: { type: GraphQLString },
  username: { type: GraphQLString },
  password: { type: GraphQLString },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
  image: { type: GraphQLString },
  myActivities: { type: new GraphQLList(GraphQLString) },
  friendActivities: { type: new GraphQLList(GraphQLString) },
  pendingActivities: { type: new GraphQLList(GraphQLString) }
};

const Friend = new GraphQLObjectType({
  name: "Friend",
  fields: FriendFields
});

const FriendRating = new GraphQLObjectType({
  name: "FriendRating",
  fields: {
    itemId: { type: GraphQLString },
    rating: { type: GraphQLString }
  }
});

const RatingFields = {
  activityId: { type: GraphQLString },
  friendId: { type: GraphQLString },
  ratings: { type: new GraphQLList(FriendRating) }
};

const Rating = new GraphQLObjectType({
  name: "Rating",
  fields: RatingFields
});

const RatingWithFriendData = new GraphQLObjectType({
  name: "RatingWithFriendData",
  fields: {
    ...RatingFields,
    ...FriendFields
  }
});

const ActivityItem = new GraphQLObjectType({
  name: "ActivityItem",
  fields: {
    itemId: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const Activity = new GraphQLObjectType({
  name: "Activity",
  fields: {
    activityId: { type: GraphQLString },
    title: { type: GraphQLString },
    ratingType: { type: GraphQLString },
    items: { type: new GraphQLList(ActivityItem) },
    ratings: {
      type: RatingWithFriendData,
      resolve: () => {
        return {
          ...activityRatings[0],
          // This should eventually use the friendId to search for friend data
          // Thinking this should actually be its own type with resolver, something
          // like friendInfo as a field that can be queriable only if needed
          ...friends.find(friend => activityRatings[0].friendId === friend.id)
        };
      }
    }
  }
});

module.exports = {
  friendScore,
  TierActivity,
  Friend,
  Activity,
  Rating,
  RatingWithFriendData
};
