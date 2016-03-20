var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var dotenv = require('dotenv');


dotenv.load({ path: '.env' });

//Routes
var routes = {};
routes.index = require('./routes/index');
routes.discussions = require('./routes/discussions');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler());

//index to show angularjs
app.get('/', routes.index.index);

//all URLs below are specific for API REST requests.

//API Discussion
app.get('/listDiscussions', routes.discussions.listDiscussions);
app.get('/getDiscussion/:id', routes.discussions.getDiscussion);
app.post('/saveDiscussion', routes.discussions.saveDiscussion);

app.post('/saveReplyToDiscussion/:id', routes.discussions.saveReplyToDiscussion);


http.createServer(app).listen(app.get('port'), function(){
  console.log('DiscussionNodeJS server listening on port ' + app.get('port'));
});
