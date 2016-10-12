
var mongoose=require('mongoose');

var CatetoryShcema=require('../schemas/catetory.js');

var Catetory=mongoose.model('Catetory',CatetoryShcema);

module.exports=Catetory;
