const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1b3b33c2dd9a427aab31f5e1f7dc78e4');
newsapi.v2.everything({
  q: 'bitcoin',
  // sources: 'bbc-news,the-verge',
  // domains: 'bbc.co.uk, techcrunch.com',
  from: '2019-05-01',
  to: '2019-05-12',
  language: 'en',
  sortBy: 'relevancy',
//   page: 2
}).then(response => {
  console.log(response.articles);
});