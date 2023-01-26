const express=require('express');
const { createUser, loginUser, logout, userDetails, updatePassowrd, updateProfile, allUsers, getAllUsers, singleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router=express.Router();

router.post('/ragister',createUser);

router.post('/login',loginUser);

router.get('/logout',logout);

router.get('/user',isAuthenticatedUser,userDetails);

router.post('/password/update',isAuthenticatedUser,updatePassowrd);

router.post('/user/update',isAuthenticatedUser,updateProfile);

router.get('/admin/users',isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

router.get('/admin/users/:id',isAuthenticatedUser,authorizeRoles("admin"),singleUser);

router.post('/admin/user/update',isAuthenticatedUser,authorizeRoles("admin"),updateUserRole);

router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRoles("admin"),deleteUser);


module.exports= router;