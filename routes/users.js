var express = require('express');
var router = express.Router();
//const userSchema = require('../schemas/user_schema');
const userServices = require('../services/user-service');

// getting records
router.get('/users', userServices.getAllusers);


// gettin based on id
router.post('/user', function(req, res) {
  let queryBody = req.body;
  userServices.getUser(queryBody,res);
});


// inseting records
router.post('/users', function(req, res) {
   let queryBody = req.body;
  //  const {error} = userSchema.validateUser(queryBody);
  //  if(error) return  res.status(400).send(result.error.details[0].message);
   userServices.createUser(queryBody,res);
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
