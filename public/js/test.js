$("#api-test").on("click", function() {
  topicInput = $("#topic-input")
    .val()
    .trim();

  axiosCall(topicInput);
});

function axiosCall(input) {
  var url =
    "https://newsapi.org/v2/everything?q=" +
    input +
    "&pageSize=1&apiKey=1b3b33c2dd9a427aab31f5e1f7dc78e4";

  axios.get(url).then(function(response) {
    var article = response.data.articles[0];

    var title = article.title;
    var author = article.author;
    var body = article.content;
    var url = article.url;

    console.log(title);
    console.log(author);
    console.log(body);
    console.log(url);
  });
}

// $("#api-test").on("click", function() {
//   var topicInput = $("#topic-input")
//     .val()
//     .trim();

//   $.ajax({
//     url:
//       "https://newsapi.org/v2/everything?q=" +
//       topicInput +
//       "&pageSize=1&apiKey=1b3b33c2dd9a427aab31f5e1f7dc78e4",
//     success: function(result) {
//       var article = result.articles[0];
//       $("#title").text(article.title);
//       $("#author").text(article.author);
//       $("#body").text(article.content);
//     }
//   });
// });
