var Movie = require('../modules/movie.js');
var Comment = require('../modules/comment.js');
var Catetory = require('../modules/catetory.js');

var _ = require('underscore');

exports.detall = function(req,res){

    var id=req.params.id;

    Movie.findById(id,function(err,movie){
        Comment.
            find({movie:id}).
            populate('from','name').
            populate('reply.from reply.to', 'name').
            exec(function(err,comments){
                console.log(comments);
                if(err){
                    console.log(err)
                }
                res.render('detail',{
                    title:'详情页'+movie.title,
                    movie:movie,
                    comments:comments
                })
            });
    });
};


exports.list = function(req,res){

    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }else{
            res.render('list', {
                title: '列表页',
                movies:movies
            })
        }
    });

};

exports.new = function(req,res){
    Catetory.find({},function(err,catetories){
        res.render('admin',{
            title:'我的录入页',
            catetories:catetories,
            movie:{}
        })
    });
};

exports.save = function(req,res){
    var id=req.body.movie._id;
    var movieObj=req.body.movie;
    var _movie;
    if(id){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movie._id)
            });
        })
    }else{
        console.log(movieObj);
        _movie = new Movie(movieObj);

        var catetoryID = _movie.catetory;

        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            Catetory.findById(catetoryID,function(err,catetory){
                catetory.movies.push(_movie._id);
                catetory.save(function(err,catetory){
                    res.redirect('/movie/'+movie._id)
                })
            });
        })
    }
};

exports.update = function(req,res){
    var id=req.params.id;

    if(id){
        Movie.findById({_id:id},function(err,movie){
            Catetory.find({},function(err,catetories){
                if(err){
                    console.log(err)
                }
                res.render('admin',{
                    title:'后台更新页面',
                    movie:movie,
                    catetories:catetories
                })
            })
        })
    }
};

exports.del = function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
};