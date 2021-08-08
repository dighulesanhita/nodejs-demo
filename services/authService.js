const accounts = require("../models/accounts");
const passport = require('passport');
// const { response } = require("../app");

exports.signup = function (signupFormData, callback) {

    console.log(signupFormData);
    //exec query 
    // temp password npm i generate password
    // gen salt and hash for the password

    // TODO: remove password from signupFormData. learn about removing propoerty from obj // strict: false
    const accountDAO = new accounts(signupFormData);

    accountDAO.setPassword(signupFormData.password); // strict: false

    accountDAO.save((err, result) => {
        if (!err) {
            console.log('Signup Successful!');
            // send email with temp password to verify - using sendgrid/mail @ https://www.npmjs.com/package/@sendgrid/mail
        }

        callback(err, {
            info: 'Signup successful!'
        });
    });
    // if(!err){
    // console.log('Signup Successful!');
    // }
    // callback(err, result);

}

exports.login = function (req, callback) {

    //exec query 
    console.log(req.body);
    // 1. check whether the email is valid or not (already registered or not?)
    // 2. if true, validate the password by regenerating the salt 
    // 3. if password matches then generate JWT and send it

    // Begin authentication flow
    passport.authenticate('local', function (err, account, info) {
        // check whether user is present 
        if (err) {
            callback(err);
        }
        // check if account is found - upon successful authentication
        if (account) {
            const response = {
                email: account.email,
                token: account.generateJWT(),   // generate JWT token
            }
            callback(err, response);
        } else {
            // when email is not found send error
            callback(err, info);
        }
    })(req, callback);

    // read about - IIFE immediately invokable function execution

    // if(!err){
    // console.log('Signup Successful!');
    // }
    // callback(err, result);

}