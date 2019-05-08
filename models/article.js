module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    body: DataTypes.TEXT,
    url: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return Article;
};
