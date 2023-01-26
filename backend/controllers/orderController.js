const ErrorHandler=require('../utils/errorHandler');
const Order=require('../models/orderModel');
const Product=require('../models/productModel');


//Create New Order

exports.newOrder=async(req,res,next)=>{

    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;

    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
}

//Get Single Order

exports.getSingleOrder=async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate('user','name email');//populate is used to get user name and email by unsing user id.

    if(!order)
    {
        return next(new ErrorHandler("Order dose not exist",400));
    }

    res.status(200).json({
        success:true,
        order
    })
}

//Get logged in User Order

exports.userOrder=async(req,res,next)=>{

    const order=await Order.find({user:req.user._id})

    if(!order)
    {
        return next(new ErrorHandler("No Oder Found",400));
    }

    res.status(200).json({
        success:true,
        order
    })

}

//Get All Orders--Admin

exports.allOrders=async(req,res,next)=>{

    const orders=await Order.find();

    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount=totalAmount+order.totalPrice
    })

    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
}

//Update Order Status--Admin

exports.updateOrder=async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if(!order)
    {
        return next(new ErrorHandler('Order not Found',404));
    }

    if(order.orderStatus==='Delivered')
    {
        return next(new ErrorHandler("Your Order is already delivered",400));
    }

    order.orderItems.forEach(async(o)=>{
        await updateStock(order.Product,order.quantity);
    })

    order.orderStatus=req.body.status;
    if(req.body.status==='Delivered')
    {
        order.deliveredAt=Date.now();
    }

    await order.save();

    res.status(200).json({
        success:true
    })
    
}

 updateStock=async(id,quantity)=>{

    const product=await Product.findById(id);
    product.stock=product.stock-quantity;

    await product.save();
}

//Delete order--Admin

exports.deleteOrder=async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if(!order)
    {
        return next(new ErrorHandler('Order Not Found',400))
    }

    await order.remove();

    res.status(200).json({
        success:true,
        message:'Order deleted successfully'
    })
}