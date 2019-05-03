$("#api-test").on("click", function() {
  var topicInput = $("#topic-input")
    .val()
    .trim();

  $.ajax({
    url:
      "https://newsapi.org/v2/everything?q=" +
      topicInput +
      "&apiKey=1b3b33c2dd9a427aab31f5e1f7dc78e4",
    success: function(result) {
      var article = result.articles[0];

      $("#title").text(article.title);
      $("#author").text(article.author);
      $("#body").text(article.content);
    }
  });
});
