const Joi = require('@hapi/joi');

//validating admin input
    const addAdminschema = {
        body:{
            sub:Joi.string().required(), 
            question:Joi.string().required(),
            options:Joi.object().keys({
                1:Joi.string().required(),
                2:Joi.string().required(),
                3:Joi.string().required(),
                4:Joi.string().required(),
            }),
            answer:Joi.number().integer(),
             marks:Joi.number().integer(),
                  } 
        };
       
  
      
  module.exports={addAdminschema:addAdminschema}