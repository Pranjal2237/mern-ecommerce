const express=require('express');
const { newOrder, getSingleOrder, userOrder, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router=express.Router();

router.post('/order/new',isAuthenticatedUser,newOrder);

router.get('/order/:id',getSingleOrder);

router.get('/orders',isAuthenticatedUser,userOrder);

router.get('/admin/orders',isAuthenticatedUser,authorizeRoles("admin"),allOrders);

router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles('admin'),updateOrder);

router.delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);



module.exports=router;