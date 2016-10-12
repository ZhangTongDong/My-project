
var mongoose=require('mongoose');

var CommentShcema=require('../schemas/comment.js');

var Comment=mongoose.model('Comment',CommentShcema);

module.exports=Comment;
