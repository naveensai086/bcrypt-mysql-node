var express = require('express');
var router = express.Router();
const expressValidator = require('express-joi-validator');
const userServices = require('../services/user-service');
const userSchema = require('../schemas/user_schema');
//const verifyToken = require('../middlewares/verifytoken')

// getting records
router.get('/users', userServices.getAllusers);


// gettin based on mail
router.post('/user', function(req, res) {
  let queryBody = req.body;
  userServices.getUser(queryBody,res);
});


// inseting records
router.post('/users',expressValidator(userSchema.adduserschema), function(req, res) {
   let queryBody = req.body;
   userServices.createUser(queryBody,res);
});


//sending questions
router.get('/users/onlineexam',function(req, res) {          // ,verifyToken.verify
  userServices.onlineQuestions(req,res);
});





// //update password
// router.put('/employee', function(req, res) {
//   let queryBody = req.body;
//   EmployeeServices.updateEmployee(queryBody,res);

// });

// //delete employee
// router.delete('/employee', function(req, res) {
//   let queryBody = req.body;
//   EmployeeServices.deleteEmployee(queryBody,res);

// });





module.exports = router;
