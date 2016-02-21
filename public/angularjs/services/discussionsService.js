app.service('discussionsService', function ($http) {

    this.getDiscussions = function(callback) {

        $http.get('/listDiscussions').success(function(retorno) {
            callback(retorno.discussions);
        });

    };

    this.saveDiscussion = function(discussion, callback) {
        $http.post('/saveDiscussion', discussion).success(function() {
            callback();
        });
    }


    this.saveReplyToDiscussion = function(discussionID, reply, callback) {

        $http.post('/saveReplyToDiscussion/' + discussionID, reply).success(function(retorno) {
            callback(retorno.reply);
        });

    }


    this.getDiscussion = function(discussionID, callback) {
        
        $http.get('/getDiscussion/' + discussionID).success(function(retorno) {
            callback(retorno.discussion);
        });

    }

});