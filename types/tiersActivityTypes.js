const { GraphQLList, GraphQLString, GraphQLObjectType } = require("graphql");
const {
  FriendRatings,
  friends,
  activities,
  activityRatings
} = require("../TestData");
var mongo = require("mongodb");

const friendScore = new GraphQLObjectType({
  name: "FriendScore",
  fields: {
    name: { type: GraphQLString },
    score: { type: GraphQLString }
  }
});

// TODO: Remove once deprecated getTierActivity can be removed
const TierActivity = new GraphQLObjectType({
  name: "FriendCategory",
  fields: {
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
  itemRatings: { type: new GraphQLList(FriendRating) }
};

const Rating = new GraphQLObjectType({
  name: "Rating",
  fields: RatingFields
});

const RatingWithFriendInfo = db =>
  new GraphQLObjectType({
    name: "RatingWithFriendInfo",
    fields: {
      ...RatingFields,
      friendInfo: {
        type: Friend,
        resolve: async activity => {
          const friendsCollection = db.collection("friends");
          return await friendsCollection.findOne({
            _id: new mongo.ObjectID(activity.friendId)
          });
        }
      }
    }
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

const Activity = db =>
  new GraphQLObjectType({
    name: "Activity",
    fields: {
      id: { type: GraphQLString, resolve: activity => activity._id.toString() },
      title: { type: GraphQLString },
      ratingType: { type: GraphQLString },
      items: { type: new GraphQLList(ActivityItem) },
      activityRatings: {
        type: new GraphQLList(RatingWithFriendInfo(db)),
        resolve: async activity => {
          const activityId = activity._id;
          const ratingsCollection = db.collection("activityRatings");
          const ratings = await ratingsCollection
            .find({
              activityId: activityId.toString()
            })
            .toArray();
          return ratings;
        }
      }
    }
  });

module.exports = {
  TierActivity,
  Friend,
  Activity,
  Rating,
  RatingWithFriendData
};
