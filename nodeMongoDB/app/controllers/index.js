
var Movie = require('../modules/movie.js');
var Catetory = require('../modules/catetory.js');

exports.index = function(req,res){
    Catetory.
        find({}).
        populate({path: 'movies', options:{limit:5}}).
        exec(function(err,catetorys){
            if(err){
                console.log(err);
            }
            res.render('index', {
                title: '首页',
                catetorys:catetorys
            })

        });
};
