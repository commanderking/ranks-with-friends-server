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
        id: "1",
        name: "The Once and Future King"
      },
      {
        id: "2",
        name: "Billy Budd"
      },
      {
        id: "3",
        name: "Rebecca"
      }
    ]
  }
];

// From Ratings Table: Collection of all ratings ever given - is this too large?
const Ratings = [
  {
    activityId: "abc123",
    friendId: "friend123",
    ratings: [
      {
        id: "1",
        score: "S"
      },
      {
        id: "2",
        score: "C"
      },
      {
        id: "3",
        score: "A"
      }
    ]
  },
  {
    activityId: "abc123",
    friendId: "friend123",
    ratings: [
      {
        id: "1",
        score: "A+"
      },
      {
        id: "2",
        score: "C+"
      },
      {
        id: "3",
        score: "B+"
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
  FriendRatings
};
