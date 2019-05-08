// Your web app's Firebase configuration
var firebaseConfig = {
  // Todo: hide api key before production
  apiKey: "AIzaSyDlUwgWUrPu6n65n98uiaJne_VWKSns0V0",
  authDomain: "project-2-e4025.firebaseapp.com",
  databaseURL: "https://project-2-e4025.firebaseio.com",
  projectId: "project-2-e4025",
  storageBucket: "project-2-e4025.appspot.com",
  messagingSenderId: "5606848709",
  appId: "1:5606848709:web:31d2666f303e34f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
// firebaseConfig.authDomain().onAuthStateChanged(function(user) {
//   if (user) {
//     // user is signed in
//   } else {
//     // user is not signed in
//   }
// });
// var user = firebase.auth().currentUser;
// if (user) {
//   // user is signed in
//   console.log(user);
// } else {
//   // user is not signed in
// }
// console.log(firebase.auth().currentUser.uid);
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
    // var db = require("./models");
    // db.Article.create({
    //   title: article.title,
    //   author: article.author,
    //   body: article.content,
    //   url: article.url
    // }).then(function(dbArticle) {
    //   console.log(dbArticle);
    // });
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var newArticle = {
        title: title,
        author: author,
        body: body,
        url: url
      };

      // Send the POST request.
      $.ajax("/api/articles", {
        type: "POST",
        data: newArticle
      }).then(function() {
        console.log("created new article");
        // Reload the page to get the updated list
      });
    });
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
