var express = require("express");
var graphqlHTTP = require("express-graphql");
var graphql = require("graphql");
var { generateSchemaWithDB } = require("./schema");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db;
MongoClient.connect(
  `mongodb://jking:${
    process.env.MONGO_DB_PASSWORD
  }@ds157762.mlab.com:57762/ranks-with-friends`,
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("ranks-with-friends");

    var app = express();

    app.use("/graphql", function(req, res, next) {
      // TEMPORARY FOR DEV ENVIRONMENTS TO HIT THIS
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
      );
      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      } else {
        next();
      }
    });

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: generateSchemaWithDB(db),
        graphiql: true
      })
    );
    app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
  }
);
