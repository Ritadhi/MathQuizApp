var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const tokenSchema = new Schema({
    email: { type: String, required: true, ref: 'user' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

module.exports = mongoose.model('Token',tokenSchema);