const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('./mongo'); // importing the connection configuration
const Schema = mongoose.Schema; // capital letters are the conventions

// name of the collections is users
const User = new Schema({
    userID: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    email: String,
    phone: String,
    status: String,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updateBy: String,
    updatedOn: { type: Date, default: Date.now }
});

User.plugin(autoIncrement.plugin, {model: 'User', field: 'userID', startAt: 1});

module.exports = mongoose.model('User', User);