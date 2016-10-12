
var User = require('../modules/user.js');

exports.showSigup = function(req,res){
    res.render('sigup',{
        title: '注册页面'
    })
};
exports.showSigin = function(req,res){
    res.render('sigin',{
        title: '登录页面'
    })
};

exports.sigup = function(req,res){
    var _user = req.body.user;
    User.find({name:_user.name},function(err,user){
        if(err){
            console.log(err)
        }
        if(user.length>0){
            return res.redirect('/sigin');
        }else{
            var user = new User(_user);
            user.save(function(err,user){
                if(err){
                    console.log(err);
                }
                res.redirect('/')
            })
        }
    });
};

exports.siginRequired = function(req,res,next){
    var user = req.session.user;

    if(!user){
       return res.redirect('/sigin');
    }
    next();
};

exports.adminRequired = function(req,res,next){
    var user = req.session.user;

    if(user.role <= 10){
        return  res.redirect('/sigin');
    }
    next();
};

exports.users = function(req,res){
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }else{
            res.render('userlist', {
                title: '用户列表页',
                users:users
            })
        }
    });
};

exports.sigin = function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/sigup');
        }
        user.comparePassword(password,function(err,isMacth){
            if(err){
                console.log(err)
            }
            if(isMacth){
                req.session.user = user;
                return res.redirect('/');
            }else{
                console.log('Password is not macth');
                return res.redirect('/sigin');
            }
        })
    })
};

exports.del = function(req,res){
    var id = req.query.id;
    if(id){
        User.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
};
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/')
};