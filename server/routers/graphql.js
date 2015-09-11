let express = require('express');
let router = express.Router();
let {graphql} = require('graphql');
let graphqlHTTP = require('express-graphql');

let schema = require('../schema/');



router.all('/', graphqlHTTP({schema}));



module.exports = router;
