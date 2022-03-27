const jwt=require('jsonwebtoken');
const { customeError } = require('../helpers/errorHandeler');

exports.isAdmin=async (req,res,next)=>{
    const authHeader=req.header('Authorization');
    let token=authHeader.substring(7);
    if(Object.values(authHeader).length!=0){
        var payLoad=jwt.decode(token.toString(),process.env.SECRET_KEY);
        
        if(!payLoad || payLoad.isAdmin==false  ){
            return next(customeError({status:403,message:"Unauthorized user !"}));
        }
    }
    return next();  
}
exports.isAuthenticated=async (req,res)=>{
    const authHeader=req.header('Authorization');
    let token=authHeader.substring(7);
    if(Object.values(authHeader).length!=0){
        var payLoad=jwt.verify(token.toString(),process.env.SECRET_KEY);
        
        if(payLoad){
            return next();  
        }
    }
    return next(customeError({status:403,message:"Unauthorized user !"}));
    
}

