app.controller('DiscussionsController', function ($scope, $location, discussionsService) {

    init();

    function init() {

        discussionsService.getDiscussions(function(discussions) {
            $scope.discussions = discussions;
        });

    }

    $scope.saveDiscussion = function () {

        discussionsService.saveDiscussion($scope.discussion, function() {
            $location.path('#/discussions');
        });

    }

});


app.controller('ViewDiscussionsController', function ($scope, $routeParams, discussionsService) {
    init();

    function init() {

        var discussionID = $routeParams.discussionID;
        discussionsService.getDiscussion(discussionID, function(discussion) {
            $scope.discussion = discussion;
        });

    }


    $scope.saveReplyToDiscussion = function () {

        var discussionID = $routeParams.discussionID;

        discussionsService.saveReplyToDiscussion(discussionID, $scope.reply, function(reply) {
            reply.dateCreated = new Date();
            $scope.discussion.replies.push(reply);
            $scope.reply = {};

            var target = $('#goDown');
            console.log(target);

            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);

        });

    }

});
