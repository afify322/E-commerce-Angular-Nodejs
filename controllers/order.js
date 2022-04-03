const {Order}=require('../models/order');
const {OrderItem}=require('../models/order-item');
const {Product}=require('../models/product');


exports.getAllOrders=async (req,res)=>{
    let {page ,limit} = req.query;
    const size=await Order.count().exec();
    const skip = (page || 1 - 1) *(limit || 10);
    const pages=Math.ceil(+size/+(limit || 10));
let orders=await Order.find().skip(skip).limit(limit).populate({path:'orderItems',populate:{path:'product',populate:'category'}}).populate('userId').sort({'dateOrdered': -1}).exec();
res.status(200).json({success:true,orders:orders,pages,size});
}


exports.addOrder =async(req,res)=>{

const {body:{
    shippingAddress1,shippingAddress2,city,zip,country
    ,phone,status,userId,dateOrdered,orderItems }} =req;
    //[{id:adasdasdasd,quantity:2},{id:adasdasdasd,quantity:3}]

    
let items=await Promise.all(orderItems.map(async (e)=>{
    let singleOrderItem= await new OrderItem({product:e.productId,quantity:e.quantity});
    singleOrderItem.save();
    return singleOrderItem._id;
}))

let prices= await Promise.all(orderItems.map(async (e)=>{
    let singlePrice=await Product.findOne({_id:e.productId}).select('price').exec();
    return (singlePrice.price*e.quantity)
   
}))
let totalPrice= prices.reduce((e,q)=>e+q);

 let order=new Order({
    orderItems:items,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    userId,
    dateOrdered,
    totalPrice:totalPrice,

})
order.save(); 
return res.status(201).json({success:true,order})


}

exports.getOrderById=async(req,res)=>{
    const {params:{id}}=req;
    let order=await Order.findById(id).populate('userId').populate({path:'orderItems',populate:{
        path:'product',populate:'category'
    }}).exec();
    if(!order)return res.status(400).json({success:false,message:"Order not Found"})
    return res.status(200).json({success:true,order});
}

exports.updateOrder=async(req,res)=>{
    const {params:{id}}=req;
    const {body}=req;
    let order=await Order.findByIdAndUpdate(id,body);
    if(!order)res.status(400).json({success:false,message:"Order not found"});
    return res.status(202).json({success:true,order});
}

exports.deleteOrder=async(req,res)=>{
    const {params:{id}}=req;
    let order=await Order.findByIdAndRemove(id);
    if(!order)res.status(404).json({success:false,message:"Order not found"});
    await order.orderItems.map(async orderItem => {
        await OrderItem.findByIdAndRemove(orderItem)
    })
    return res.status(202).json({success:true,order}); 
}


exports.userOrders= async(req,res)=>{
    const {params:{id}}=req;
    console.log(id);
    const userOrderList = await Order.find({userId:id}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(userOrderList.length==0)return res.status(404).json({success: false,message:"orders not found"});
       
    
   return res.status(200).json({success:true,orders:userOrderList});
}

exports.getTotalSales = async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) return res.status(404).json({success:false,message:'The order sales cannot be generated'})
   

    return res.status(200).json({success:true,totalsales: totalSales.pop().totalsales})
}

