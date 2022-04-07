const Joi = require('joi');
const {customeError} = require('../helpers/errorHandeler');
const productSchema = Joi.object({

    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    brand: Joi.string(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    countInStock: Joi.number().required(),
    rating: Joi.number().min(0).max(5).required(),
    dateCreated: Joi.date(),
    isFeatured: Joi.bool()
});


exports.productValidation =   async function(req, res, next) { 
        const {body}=req;

        try {
         await productSchema.validateAsync(body,{abortEarly:false})
           
           return next()
        } catch (err) {
            
            return next(customeError({ status: 400, message: err.details }));  
        }
    }
 