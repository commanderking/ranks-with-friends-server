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
  id: { type: GraphQLNonNull(GraphQLString) },
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
    itemId: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) }
  }
});

const Activity = db =>
  new GraphQLObjectType({
    name: "Activity",
    fields: {
      id: {
        type: GraphQLNonNull(GraphQLString),
        resolve: activity => activity._id.toString()
      },
      title: { type: GraphQLNonNull(GraphQLString) },
      ratingType: { type: GraphQLNonNull(GraphQLString) },
      items: {
        type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(ActivityItem))),
        resolve: activity => activity.items || []
      },
      activityRatings: {
        type: new GraphQLNonNull(
          GraphQLList(GraphQLNonNull(RatingWithFriendInfo(db)))
        ),
        resolve: async activity => {
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
    }
  });

module.exports = {
  TierActivity,
  Friend,
  Activity,
  Rating,
  RatingWithFriendData
};
