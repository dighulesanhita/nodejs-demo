var express = require('express');
const userService = require('../../services/userService');
var router = express.Router();

// acts as middleware
// function isAuth() {
//   // verify JWT
//   // before returning false construct a token invalid responseand send it
//   // return false
//   return true;
// }
/* GET users listing. */
/*api/users */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  console.log(`Request Method ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  // sending static data as response
  // res.json([
  //   {
  //     id: 1,
  //     name: 'John',
  //     phone: '24567',
  //     email: 'abc@cde.com'
  //   },
  //   {
  //     id: 2,
  //     name: 'Johnny',
  //     phone: '2456787',
  //     email: 'abccd@cde.com'
  //   }]);

  // sending dynamic data as response
  userService.getUser(function (err, result) {
    if (!err) {
      res.json(result);
    } else {
      res.json(err);
    }
  });

});

/* POST user */
// router.post('/', isAuth(), function (req, res, next) {
  router.post('/', function (req, res, next) {
  console.log(req.body);
  //static
  // res.status(201).json({
  //   status: 201,
  //   msg: 'User Create Successfully!',
  //   data: {
  //     id: 999,
  //     name: req.body.name,
  //     email: req.body.email,
  //     phone: req.body.phone
  //   }
  // });

  // dynamic
  // 1. send data to service
  userService.createUser(req.body, function (err, result) {
    if (!err) {
      res.status(201).json(result);
    } else {
      res.json(err);
    }
  });
  // 2. get the result from the service
});

/*Get user by id*/
/*api/users/1 */
router.get('/:id', function (req, res, next) { // parameterized url / id is the URL Param
  console.log(`Fetching user by id ${req.params.id}`);
  // res.status(201).json({
  //   status: 201,
  //   msg: 'User Create Successfully!',
  //   data: {
  //     id: req.params.id,
  //     name: 'John',
  //     phone: '24567',
  //     email: 'abc@cde.com'
  //   }
  // });
  userService.getUserByID(req.params.id, function (err, result) {
    if (!err) {
      res.json(result);
    } else {
      res.json(err);
    }
  })
});

// update user by ID
router.put('/:id', (req, res, next) => {
  console.log(`User ID:${req.params.id}`); // what user id we should update
  console.log(req.body); // updatable form data

  //   res.status(201).json({
  //     msg: 'Updated Successfully',
  //     data: {
  //       id: req.params.id,
  //       name: req.body.name,
  //       email: req.body.email,
  //       phone: req.body.phone
  //     }
  //   });

  userService.updateUser(req.params.id, req.body, function (err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.json(err);
    }
  })
});


router.delete('/:id', (req, res, next) => {
  console.log(`User ID:${req.params.id}`); // what user id we should delete
  // res.status(200).json({
  //   msg: 'Data for ' + req.params.id + ' deleted successfully'
  // });
  userService.deleteData(req.params.id, function (err, result) {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.json(err);
    }
  })
});

// TODO: learn about PATCH method
// router.patch
module.exports = router;
