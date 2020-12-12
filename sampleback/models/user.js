  
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var File = require('file-type');


var schema = new Schema({
    photo: {type:File, required: true},
    name: {type:String, required:true},
    email : {type:String, require:true},
    username: {type:String, require:true},
    isVerified: { type: Boolean, default: false },
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);