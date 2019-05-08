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

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  //init modals
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");



// signup user
//===============================================================

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //log info - test - 
    console.log(email, password);

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {

        console.log(cred.user);

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// login user
//===============================================================

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get the user info from input fields
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
      // admin.auth().verifyIdToken(idToken)
      // .then(function(decodedToken) {
      //   var uid = decodedToken.uid;
      // }).catch(function(error) {
      //   console.log(error);
      // });
      // log users -test-
      // currentUser = FirebaseAuth.getInstance().getCurrentUser().getUid();
      // console.log(currentUser);
      
      // console.log(firebase.auth().currentUser.email);
      console.log(cred.user, cred.user.uid);

      // close log in modal and the reset the form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
    var uidEmail = firebase.auth().currentUser.email;
    console.log(uidEmail);
});
// logout user
//===============================================================

const logout = document.querySelector('#Logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();

  // sign out the user
  auth.signOut().then(() => {
    console.log('user signed out');
  });
});


// API search
//===============================================================

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

$("#get-user").on("click", function() {
  var user = firebase.auth().currentUser.email;

  console.log(user);
});