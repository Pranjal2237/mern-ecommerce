const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, singleProduct, productReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router=express.Router();

router.post('/admin/product/new',isAuthenticatedUser,authorizeRoles("admin"),createProduct)

router.get('/products',getAllProducts);

router.put('/admin/product/:id',isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

router.delete('/admin/product/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.get('/product/:id',singleProduct);

router.post('/product/:id',isAuthenticatedUser,productReview);

router.get('/product/:id',)

module.exports = router;