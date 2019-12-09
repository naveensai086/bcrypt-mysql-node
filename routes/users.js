var express = require('express');
var router = express.Router();
const expressValidator = require('express-joi-validator');
const userServices = require('../services/user-service');
const resetServices = require('../services/reset-Service');
const userSchema = require('../schemas/user_schema');


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

//validate result
router.post('/users/validate', function(req, res) {
  let queryBody = req.body;
  userServices.validateResult(queryBody,res);
});

//temporary password mail
router.post('/users/reset', function(req, res) {
  let queryBody = req.body;
  resetServices.resetPassword(queryBody,res);
});

//reset password for mail
router.post('/users/newpassword', function(req, res) {
  let queryBody = req.body;
  resetServices.newPassword(queryBody,res);
});



module.exports = router;
