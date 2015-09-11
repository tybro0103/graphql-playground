let express = require('express');
let router = express.Router({ mergeParams: true });



// send root path to prod dashboard
router.get('/', (req, res) => {
  res.render('index');
});

// routers
router.use(`/graphql`, require('./graphql'));
router.use(`/graphiql`, require('./graphiql'));



module.exports = router;
