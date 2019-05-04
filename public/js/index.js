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

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);



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
        
      // log users -test-
      console.log(cred.user, cred.user.uid);

      // close log in modal and the reset the form
      const modal = document.querySelector('#modal-login');
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
