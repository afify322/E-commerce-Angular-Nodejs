const mongoose=require('mongoose');

exports.connect= (async()=> {
    try {
        
    var client= await mongoose.connect("mongodb+srv://ITI:ITI@ecommerce.aqzfd.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-xdveji-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");
    
    } catch (error) {
     console.log(error);
     process.exit(1);
    }

  return client;

})();
