var express = require("express");
var graphqlHTTP = require("express-graphql");
var graphql = require("graphql");
var { schema } = require("./schema");

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
    schema,
    graphiql: true
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
