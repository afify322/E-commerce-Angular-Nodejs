const Joi = require('joi');
const {customeError} = require('../helpers/errorHandeler');
const productSchema = Joi.object({

    orderItems: Joi.any().required(),
    shippingAddress1: Joi.string().required(),
    shippingAddress2: Joi.string(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.string(),
    userId: Joi.string().required()
  
});


exports.orderValidation =   async function(req, res, next) { 
        const {body}=req;

        try {
         await productSchema.validateAsync(body,{abortEarly:false})
           
           return next()
        } catch (err) {
            
            return next(customeError({ status: 400, message: err.details }));  
        }
    }
 
