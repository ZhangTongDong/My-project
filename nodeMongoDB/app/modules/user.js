
var mongoose=require('mongoose');

var UserShcema=require('../schemas/user.js');

var User=mongoose.model('User',UserShcema);

module.exports=User;
