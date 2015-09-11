let React = require('react');
let GraphiQL = require('graphiql');
let fetch = require('isomorphic-fetch');

function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    })
    .then(res => res.json());
}

let GraphiqlPage = {

  start() {
    let graphiql = <GraphiQL fetcher={graphQLFetcher} />;
    React.render(graphiql, document.body);
  }

};

module.exports = GraphiqlPage;
