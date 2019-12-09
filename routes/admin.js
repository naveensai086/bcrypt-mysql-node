var express = require('express');
var router = express.Router();
const expressValidator = require('express-joi-validator');
const adminSchema = require('../schemas/admin-schema');
const adminService = require('../services/admin-service');
const verifyToken = require('../middlewares/verifytoken');

//adding questions
router.post('/admin',verifyToken.verify,expressValidator(adminSchema.addAdminschema), function(req, res) {
  
     let queryBody = req.body;
    adminService.createQuestion(queryBody,res);
 });
// getting results
 router.get('/admin',verifyToken.verify, function(req, res) {
   adminService.getResults(req,res);
});

 module.exports = router;