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
document.addEventListener("DOMContentLoaded", function () {
  //init modals
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

//show links based on user status
//==============================================================
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {

      //toggle ui elements
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');

  } else {

      //toggle ui element
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');

  }
}

// listen for auth status changes
//===============================================================

auth.onAuthStateChanged(user => {
  if (user) {
      db.collection('posts').onSnapshot(snapshot => {
          setupUI(user);
      });
  } else {
      setupUI();
  }
});

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

    console.log(cred.user, cred.user.uid);

    // PUT EMAIL INTO LOCAL STORAGE
    localStorage.setItem("email", email);

    // close log in modal and the reset the form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
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

$("#api-test").on("click", function () {
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

  axios.get(url).then(function (response) {
    var article = response.data.articles[0];

    var title = article.title;
    var author = article.author;
    var body = article.content;
    var url = article.url;

    $(".create-form").on("submit", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      var email = auth.currentUser.email;
      var newArticle = {
        title: title,
        author: author,
        body: body,
        url: url,
        email: email
      };

      // Send the POST request.
      $.ajax("/api/articles", {
        type: "POST",
        data: newArticle
      }).then(function () {
        console.log("created new article");
      });
    });
    console.log(title);
    console.log(author);
    console.log(body);
    console.log(url);
  });
}

//Inital array of Pre determined toics
var preButtons = ["javascript", "Avengers", "NFL Draft", "Coding", "TN House"]

//Generate buttons for topics in the array
for (var i = 0; i < preButtons.length; i++) {

  //Generate buttons for buttons in the array
  var newButton = $("<button>");
  //creates button class  
  newButton.addClass("ourButton red lighten-2 waves-effect waves-light btn");
  //adding a data-attr
  newButton.attr("data-name", preButtons[i]);
  //inital button text
  newButton.text(preButtons[i]);
  //adds button to html
  $(".buttons-view").append(newButton);
}
//Hides landing card in html when page is first loaded
$(document).ready(function () {
  $(".landingCard").hide();
});

$(document).on("click", ".ourButton", function () {

  $(".landingCard").show();
  var ourTopics = $(this).attr("data-name");
  console.log(ourTopics)

  $.ajax({
    url:
      "https://newsapi.org/v2/everything?q=" +
      ourTopics +
      "&apiKey=70a63249c97548da8c4cb9a90d1d5597",
    success: function (result) {
      var article = result.articles[0];

      $("#title").text(article.title);
      $("#author").text(article.author);
      $("#body").text(article.content);
      $("#links").attr("href", article.url);
    }
  });


});