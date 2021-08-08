// establish handshake with DB(from services)
const User = require('../models/user');

// createUser
/*
exports.createUser = function (userData, callback) { // accessible outside of this class  | exports -> commonJS
    console.log('inside createUser');
    console.log(userData);

    // console.log(callback); // unexecuted function received here, it can be called anywhere

    //mocking the db call with 2 sec timeout
    setTimeout(() => {
        // callback();
        callback(null, {
            id: 1,
            name: 'John',
            phone: '24567',
            email: 'abc@cde.com'
        });
    }, 2000);


    //exec query -> can take time so consider delay

    // send data back to routes
    // return {}
}*/
exports.createUser = function (userData, callback) { // accessible outside of this class  | exports -> commonJS
    console.log('inside createUser');
    userData.status = 'ACTIVE';

    // exec db query
    const userDAO = new User(userData);
    userDAO.save((err, savedUser) => {
        // send the data from here
        if (!err) {
            console.log(`User saved successfully ${savedUser.name}`);
        }
        callback(err, savedUser);
    });
}
// getUsers/ getAllUsers
// exports.getUser = function (callback) {
//     callback(null, [
//         {
//             id: 1,
//             name: 'John',
//             phone: '24567',
//             email: 'abc@cde.com'
//         },
//         {
//             id: 2,
//             name: 'Johnny',
//             phone: '2456787',
//             email: 'abccd@cde.com'
//         }
//     ]);
// }

exports.getUser = function (callback) {
    User.find((err, userList) => {
        if (!err) {
            console.log('Users fetched: ' + userList.length);
        }
        callback(err, userList);
    })
}

// // getUserByID
// exports.getUserByID = function (userId, callback) {
//     console.log(userId);
//     callback(null, {
//         id: userId,
//         name: 'John',
//         phone: '24567',
//         email: 'abc@cde.com'
//     });

// }

// getUserByID
exports.getUserByID = function (userId, callback) {
    User.findOne({ userID: userId }, (err, user) => {
        if (!err) {
            console.log('User at ID: ' + userId + ' fetched');
        }
        callback(err, user);
    });
}
//updateUser
// exports.updateUser = function (userId, userData, callback) {
//     console.log(userId);
//     console.log(userData);
//     callback(null, {
//         msg: 'Updated Successfully',
//         data: {
//             id: userId,
//             name: userData.name,
//             email: userData.email,
//             phone: userData.phone
//         }
//     });
// }

exports.updateUser = function (userId, userData, callback) {
    User.updateOne({ userID: userId }, userData, (err, result) => {
        let _msg = 'Error Occurred, please try again later';
        if (!err) {
            if (result && result.n == 1) {
                console.log(result);
                _msg = 'Record updated';
            }
        }
        callback(err, { msg: _msg });
    });
}


// exports.updateUser = function (userId, userData, callback) {
//     User.updateOne({ userID: userId }, userData, (err, result) => {
//         let _msg = 'Error Occurred, please try again later';
//         if (!err) {
//             if (result && result.n == 1) {
//                 console.log(result);
//                 User.findOne({ userID: userId }, (err, user) => {
//                     if (!err) {
//                         console.log('User at ID: ' + userId + ' fetched');
//                     }
//                     callback(err, user);
//                 });
//             }
//         }
//     });
// }


// deleteUser
// exports.deleteData = function (userID, callback) {
//     callback(null, {
//         msg: 'Data for ' + userID + ' deleted successfully'
//     });
// }


// soft delete - status = 'INACTIVE'
exports.deleteData = function (userID, callback) {
    User.deleteOne({ userID: userID }, (err, result) => {
        if (!err) {
            console.log('User at ID: ' + userID + ' deleted');
        }
        callback(err, userID);
    });
}
