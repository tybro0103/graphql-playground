let express = require('express');
let path = require('path');
let ejsMateEngine = require('ejs-mate')
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compression = require('compression');
let cookieSession = require('cookie-session');
let sassMiddleware = require('node-sass-middleware');
let _ = require('lodash');
let browserify = require('browserify');
let browserifyInc = require('browserify-incremental');

let router = require('./routers/');

let projectRoot = path.join(__dirname, '../');
let app = express();

// views
app.engine('ejs', ejsMateEngine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(projectRoot, 'public')));
app.use(cookieSession({name: 'graphiql-playground', secret: 'not-too-secret'}));

// js
app.use('/js/app.js', (req, res, next) => {
  res.type('application/javascript');

  let b = browserify(_.merge(browserifyInc.args, {
    debug: true, // enable sourcemap
    insertGlobals: true, // make builds faster - might break some modules though
    transform: ['babelify'],
    extensions: ['.js', '.jsx']
  }));

  browserifyInc(b, {cacheFile: path.join(projectRoot, 'tmp/browserify-cache.json')});
  b.add(path.join(projectRoot, 'client/index.js'));
  b.bundle().pipe(res);
});

// css
app.use('/css/', sassMiddleware({
  src: path.join(projectRoot, 'assets', 'sass'),
  includePaths: [path.join(projectRoot, 'bower_components')],
  dest: path.join(projectRoot, 'public', 'css'),
  response: true, // just output straight to response, not write to file
  force: true // always recompile
}));

// routes
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500);
  res.render('error', {error});
});

module.exports = app;
