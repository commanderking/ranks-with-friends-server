// From Friends table
const friends = [
  {
    id: "friend123",
    username: "kgeezer",
    password: "kekekekekeweazer",
    firstName: "Allison",
    lastName: "King",
    image: "",
    myActivities: ["abc123"],
    friendActivities: [],
    pendingActivities: []
  },
  {
    id: "friend456",
    username: "koolkingkat",
    password: "kingkoolrule",
    firstName: "Jeffrey",
    lastName: "King",
    image: "",
    myActivities: [],
    friendActivities: ["abc123"],
    pendingActivities: []
  }
];

// From Activities Table
const activities = [
  {
    activityId: "abc123",
    title: "High School Books",
    ratingType: "Tiers",
    items: [
      {
        itemId: "1",
        name: "The Once and Future King"
      },
      {
        itemId: "2",
        name: "Billy Budd"
      },
      {
        itemId: "3",
        name: "Rebecca"
      }
    ]
  }
];

const example = {
  "1": {
    itemId: "1",
    name: "The Once and Future King",
    ratingsByFriend: {
      friend123: "A",
      friend456: "B"
    },
    overallScore: "A-",
    numericScore: 0.75
  },
  "2": {
    itemId: "2",
    name: "Billy Budd",
    ratingsByFriend: {
      friend123: "C",
      friend456: "C"
    },
    overallScore: "C",
    numericScore: 0.5
  }
};

// From Ratings Table: Collection of all ratings ever given - is this too large?
const activityRatings = [
  {
    activityId: "abc123",
    friendId: "friend123",
    itemRatings: [
      {
        itemId: "1",
        rating: "S"
      },
      {
        itemId: "2",
        rating: "C"
      },
      {
        itemId: "3",
        rating: "A"
      }
    ]
  },
  {
    activityId: "abc123",
    friendId: "friend456",
    itemRatings: [
      {
        itemId: "1",
        rating: "A+"
      },
      {
        itemId: "2",
        rating: "C+"
      },
      {
        itemId: "3",
        rating: "B+"
      }
    ]
  }
];

const FriendRatings = [
  {
    activityId: "abc123",
    friend: "Allison",
    ratings: [
      {
        name: "The Once and Future King",
        score: "S"
      },
      {
        name: "Billy Budd",
        score: "C"
      },
      {
        name: "Rebecca",
        score: "A"
      }
    ]
  },
  {
    friend: "Jeffrey",
    ratings: [
      {
        name: "The Once and Future King",
        score: "A+"
      },
      {
        name: "Billy Budd",
        score: "C+"
      },
      {
        name: "Rebecca",
        score: "B+"
      }
    ]
  },
  {
    friend: "Lin",
    ratings: [
      {
        name: "The Once and Future King",
        score: "B+"
      },
      {
        name: "Billy Budd",
        score: "D-"
      },
      {
        name: "Rebecca",
        score: "D-"
      }
    ]
  }
];

module.exports = {
  friends,
  activities,
  activityRatings,
  FriendRatings
};
