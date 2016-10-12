var Mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var SALT_WORK_FACTOR = 10;

var UserSchema=new Mongoose.Schema({
    name:{
      unique:true,
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    password:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function(next){

    var user = this;

    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR ,function(err,salt){
        if(err){
            return next(err)
        }
        bcrypt.hash(user.parssword ,salt ,function(err,hash){
            if(err){
                return next(err)
            }
            user.password = hash;
            next()
        })
    });

    next();
});

UserSchema.methods={
    comparePassword:function(_password , cb){
       var password = this.password;
       if(_password==password){
           return cb(null,true);
       }else{
           return cb(null,false);
       }
    }
};

UserSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports=UserSchema;
