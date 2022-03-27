const joi=require("joi");
const {customeError}=require('../helpers/errorHandeler')
const userSchema=joi.object({
    email:joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),  
})

exports.logInValidation=async(req,res,next)=>{      
   try {
    const {body}=req;
      await userSchema.validateAsync(body,{
        abortEarly: false
    });

     return next();
       
   } catch (error) {
     return  next(customeError({status:400,message:error.details}));
   }
}