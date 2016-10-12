var express=require('express');

var path=require('path');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var serveStatic = require('serve-static');

var session = require('express-session');

var mongoose=require('mongoose');

var MongoStore = require('connect-mongo')(session);

var logger = require('morgan');

var dbUrl = 'mongodb://127.0.0.1:27017/data';
mongoose.connect(dbUrl);

var app=new express();

app.set('views','./app/views/pages');

app.set('view engine','jade');

app.use(bodyParser.urlencoded());

app.use(serveStatic(path.join('public')));

app.use(cookieParser());

app.use(session({

    secret: 'imooc',

    store: new MongoStore({

        url: dbUrl,

        collection: 'sessions'

    }),

    resave: false,

    saveUninitialized: true

}));

app.use(function(req,res,next){
    var _user = req.session.user;
    app.locals.user=_user;
    return next()
});

if('development'===app.get('env')){
    app.set('showStackError',true);
    app.use(logger(':method :url :status'));
    app.locals.pretty =true;
    mongoose.set('debug',true);
}

require('./config/routes')(app);

app.listen(80);

console.log('straed on port 80');