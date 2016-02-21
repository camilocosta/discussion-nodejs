var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/discussion-node-js');
var Schema = mongoose.Schema;

var	replySchema = new Schema({
	author: { type: String, required: true },
	content: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now }
});

var discussionSchema = new Schema({
	title: { type: String, required: true },
	tag: { type: String, required: true },
	content: { type: String, required: true },
	author: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now },
    numberOfReplies: { type: Number, default: 0 },
	replies: [replySchema]
});

var Discussion = mongoose.model('discussion', discussionSchema);

// Export Models
exports.Discussion = Discussion;
