
var mongoose=require('mongoose');

var MovieShcema=require('../schemas/movie.js');

var Movie=mongoose.model('Movie',MovieShcema);

module.exports=Movie;
