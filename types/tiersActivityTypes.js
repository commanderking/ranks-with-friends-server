const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require("graphql");
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
  id: {
    type: GraphQLNonNull(GraphQLString),
    resolve: activity => mongo.ObjectID(activity._id).toString()
  },
  username: { type: GraphQLNonNull(GraphQLString) },
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
    itemId: { type: GraphQLNonNull(GraphQLString) },
    rating: { type: GraphQLString }
  }
});

const RatingFields = {
  activityId: { type: GraphQLNonNull(GraphQLString) },
  friendId: { type: GraphQLNonNull(GraphQLString) },
  itemRatings: {
    type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(FriendRating))),
    resolve: activity => activity.itemRatings || []
  }
};

const Rating = new GraphQLObjectType({
  name: "Rating",
  fields: RatingFields
});

const RatingWithFriendInfo = name =>
  new GraphQLObjectType({
    name: `RatingWithFriendInfo${name}`,
    fields: {
      ...RatingFields,
      friendInfo: {
        type: Friend,
        resolve: async (activity, args, { db }) => {
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
    itemId: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    link: { type: GraphQLString }
  }
});

const ActivityFields = name => ({
  id: {
    type: GraphQLNonNull(GraphQLString),
    resolve: activity => activity._id.toString()
  },
  title: { type: GraphQLNonNull(GraphQLString) },
  description: { type: GraphQLString },
  ratingType: { type: GraphQLNonNull(GraphQLString) },
  items: {
    type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(ActivityItem))),
    resolve: activity => activity.items || []
  },
  activityRatings: {
    type: new GraphQLNonNull(
      GraphQLList(GraphQLNonNull(RatingWithFriendInfo(name)))
    ),
    resolve: async (activity, args, { db }) => {
      const activityId = activity._id;
      const ratingsCollection = db.collection("activityRatings");
      const ratings = await ratingsCollection
        .find({
          activityId: activityId.toString()
        })
        .toArray();
      return ratings || [];
    }
  }
});

const Activity = new GraphQLObjectType({
  name: "Activity",
  fields: ActivityFields("Query")
});

const UserInfo = new GraphQLObjectType({
  name: "UserInfo",
  fields: FriendFields
});

module.exports = {
  TierActivity,
  Friend,
  Activity,
  ActivityFields,
  FriendRating,
  Rating,
  RatingFields,
  RatingWithFriendData,
  UserInfo
};
