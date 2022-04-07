const express =require('express');
const router=express.Router();
const {orderValidation}=require('../middlewares/orderValidation')
const {getAllOrders,addOrder,deleteOrder,getOrderById,getTotalSales,updateOrder,userOrders} = require('../controllers/order');

router.get('/',getAllOrders);
router.post('/',orderValidation, addOrder);
router.delete('/:id',deleteOrder);
router.put('/:id',updateOrder);
router.get('/:id',getOrderById);
router.get('/userOrders/:id',userOrders);
router.get('/totalSales/:id',getTotalSales);


module.exports=router