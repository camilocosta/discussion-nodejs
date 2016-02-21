var express = require('express');

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
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

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
