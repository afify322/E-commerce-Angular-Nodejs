const mongoose=require('mongoose');

exports.connect= (async()=> {
    try {
        
    var client= await mongoose.connect(process.env.mongo);
    
    } catch (error) {
     console.log(error);
     process.exit(1);
    }

  return client;

})();
