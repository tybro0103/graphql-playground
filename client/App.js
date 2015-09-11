let $ = require('jquery');

let App = {

  Pages: {
    GraphiQL: require('./pages/graphiql')
  },

  start() {
    this.startPage();
  },

  startPage() {
    let pageName = $('body').data('page');
    let page = this.Pages[pageName];
    page && page.start && page.start();
  },

}

module.exports = App;
