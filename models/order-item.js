const mongoose=require('mongoose')
const OredrItemSchema=new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:'number',
        default:0
    }
})

exports.OrderItem=mongoose.model('OrderItem',OredrItemSchema);