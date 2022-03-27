const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
orderItems:[{
    ref:'OrderItem',
    type:mongoose.Types.ObjectId
}],
shippingAddress1:{
    type:'string'
},
shippingAddress2:{
    type:'string'
},
city:{
    type:'string'
},
zip:{
    type:'string'
},
country:{
    type:'string'
},
phone:{
    type:'string'
},
status:{
    type:'string',
    enum:["pending","completed","canceled"],
    default:"pending"
},
totalPrice:{
    type:'number',
    default:0,
    min:0
},
userId:{
    type:mongoose.Types.ObjectId,
    ref:'User'
},
dateOrdered:{
    type: Date,
    default: new Date()
}



},{timestamps:true})

exports.Order=mongoose.model('Order',OrderSchema);