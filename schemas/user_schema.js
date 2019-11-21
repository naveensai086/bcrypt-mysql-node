// //validating user input
// module.exports = function validateUser(user){
//     const schema = {
//         Employee_Id:Joi.number().min(3).max(10).required(),
//         First_Name:Joi.string().min(3).required(), Last_Name:Joi.string().min(3), Full_Name:Joi.string().min(3),
//        Pin_Code:Joi.number().min(2),Experience:Joi.number().max(2),Designation:Joi.string().min(2),
//        City:Joi.string().min(3), Email:Joi.Email().max(256).required(),Manager_Id:Joi.number().min(3).max(10),
//        Manager_Full_Name:Joi.string().min(3),Manager_Email:Joi.Email().max(256),
//        Created_By:Joi.string().min(3),Created_On: Joi.date(),Modified_By:Joi.string().min(3),Modified_On: Joi.date(),
//        Is_Deleted:Joi.number().max(1).required()
        
//     } ;
  
//       return Joi.validate(user,schema);
//   }