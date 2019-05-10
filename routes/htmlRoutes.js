var db = require("../models");
// var email = require("../public/js/index.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/articles/:email", function(req, res) {
    db.Article.findAll({ where: { email: req.params.email } }).then(function(dbArticles) {
      console.log("--------------------------------------------------");
      console.log(req.params.email);
      res.render("article", {
        msg: "My Articles",
        articles: dbArticles
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
