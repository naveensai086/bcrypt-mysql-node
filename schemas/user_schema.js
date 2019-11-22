const Joi = require('@hapi/joi');

//validating user input
    const adduserschema = {
        body:{
            FirstName:Joi.string().min(3).required(), LastName:Joi.string().min(3), Gender:Joi.string().min(4),
            Phone:Joi.number().integer(), Email:Joi.string().email().max(256).required(),DateOfBirth:Joi.date().required(),
            CreatedBy:Joi.string().min(3).required(),UpatedBy:Joi.string().min(3).required(),
            IsAdmin:Joi.number().integer().required(), Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()  
            
        } 
        };
       
  
      
  module.exports={adduserschema:adduserschema}