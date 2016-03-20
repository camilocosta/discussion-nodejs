var db = require('../config/mongo_database.js');
var slug = require('slug');


exports.listDiscussions = function(req, res) {

	db.Discussion.find({}, 
		{"title": 1, "tag": 1, "author": 1, "numberOfReplies": 1, "dateCreated": 1} )
	.sort({dateCreated: -1})
	.exec(function(error, discussions) {
		if(error) res.sendStatus(500);
		res.json({ discussions: discussions });
	});

};


exports.getDiscussion = function(req, res) {
	
	var id = req.params.id;
	db.Discussion.findOne({ _id: id })
	.populate('replies._author', 'name username')
	.exec(function(error, discussion) {
		if(error) res.sendStatus(500);
		res.json({ discussion: discussion });
	});

};


exports.saveDiscussion = function(req, res) {

	var discussion = new db.Discussion(req.body);
	discussion.tag = slug(discussion.title, {lower: true} );
	discussion.author = discussion.author;
	discussion.save(function(error, discussion) {
		console.log(error);
		if(error) res.sendStatus(500);
		res.sendStatus(201);
	});

};


exports.saveReplyToDiscussion = function(req, res) {

	var discussionID = req.params.id;
	db.Discussion.findOne({ _id: discussionID }, function(error, discussion) {

		if(error) res.sendStatus(500);

		var reply = req.body;

		discussion.replies.push(reply);
		discussion.numberOfReplies = discussion.numberOfReplies + 1;
		
		discussion.save(function(error, discussion) {
			
			if(error) {
				console.log("Erro ao Salvar Resposta");
				console.log(error);
				res.sendStatus(500);
			}
			
			//TODO reply
			res.json({ reply: reply });

		});
			
	});
};








