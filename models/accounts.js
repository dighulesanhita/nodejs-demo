const autoIncrement = require('mongoose-auto-increment');
const crypto = require('crypto');
const mongoose = require('./mongo'); // importing the connection configuration
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// name of the Collection is accounts
const Account = new Schema({
    accountId: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    }, // learn about unique
    salt: String,
    hash: String,
    status: String,
    isEmailVerified: Boolean,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now }
});
// }, {strict: false});
// strict: false -> can be unstructured -> will save password

// core method of Account | utility method -> encrypt the password using salt
// then get the relevant hash for the password
Account.methods.setPassword = function (password) { // original password // this keyword wont work with arrow function, make sure its a normal function
    console.log(password);

    // create salt to be applied on the password - to get the hash
    this.salt = crypto.randomBytes(16).toString('hex');
    console.log(this.salt);

    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    // this is your own algorithm - 10000 -> ecrypt 10000 times
    // TODO: read about SHA
    console.log(this.hash);

}

// have validatePassword method -> take in the original passsword as input
Account.methods.validatePassword = function (password) {
    console.log(this.salt);
    // validate the password and return true or false
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash == hash;
};

// generate JWT token
// only if successfully authenticated
Account.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: this.email,
        accountId: this.accountId,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');
}

Account.plugin(autoIncrement.plugin, { model: 'Account', field: 'accountId', startAt: 1 });
module.exports = mongoose.model('Account', Account);