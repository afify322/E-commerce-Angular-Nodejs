const express =require('express');
const router=express.Router();
const {getAllOrders,addOrder,deleteOrder,getOrderById,getTotalSales,updateOrder,userOrders} = require('../controllers/order');

router.get('/',getAllOrders);
router.post('/',addOrder);
router.delete('/:id',deleteOrder);
router.put('/:id',updateOrder);
router.get('/order/:id',getOrderById);
router.get('/totalSales/:id',getTotalSales);
router.get('/userOrders/:id',userOrders);


module.exports=router