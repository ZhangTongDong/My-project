
var Index = require('../app/controllers/index.js');

var Movie = require('../app/controllers/movie.js');

var Comment = require('../app/controllers/comment.js');

var User = require('../app/controllers/user.js');

var Catetory = require('../app/controllers/catetory.js');

var _ = require('underscore');

module.exports = function(app){

    //index
    app.get('/',Index.index);

    //movie
    app.get('/movie/:id',Movie.detall);
    app.get('/list',Movie.list);
    app.get('/admin',User.siginRequired,User.adminRequired,Movie.new);
    app.post('/admin/movie/new',User.siginRequired,User.adminRequired,Movie.save);
    app.get('/admin/update/movie/:id',User.siginRequired,User.adminRequired,Movie.update);
    app.delete('/admin/list',User.siginRequired,User.adminRequired,Movie.del);

    //user
    app.post('/user/sigup',User.sigup);
    app.post('/user/sigin',User.sigin);
    app.get('/sigin',User.showSigin);
    app.get('/sigup',User.showSigup);
    app.get('/admin/userList',User.siginRequired,User.adminRequired,User.users);
    app.get('/logout',User.logout);
    app.delete('/admin/userDel',User.siginRequired,User.adminRequired,User.del);

    //comment
    app.post('/user/comment',User.siginRequired,Comment.save);

    //category
    app.get('/admin/catetory/new',User.siginRequired,User.adminRequired, Catetory.new);
    app.post('/admin/catetory', User.siginRequired,User.adminRequired, Catetory.save);
    app.get('/admin/catetory/list',User.siginRequired,User.adminRequired, Catetory.list);

};