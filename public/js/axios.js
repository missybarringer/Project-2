var axios = require("axios");
var testInput = require("./test");

function axiosCall(input) {
  var url =
    "https://newsapi.org/v2/everything?q=" +
    input +
    "&pageSize=1&apiKey=1b3b33c2dd9a427aab31f5e1f7dc78e4";

  axios.get(url).then(function(response) {
    console.log(response.data);
  });
};

