const product=require('../models/productModel');
const ApiFeatures = require('../utils/apifeatures');
const ErrorHandler = require('../utils/errorHandler');
const { userDetails } = require('./userController');




// Create Product--Admin
exports.createProduct=async(req,res,next)=>{
    const Product=await product.create(req.body);
    res.status(201).json({
        success:true,
        Product
    })
}


// Get All Product
exports.getAllProducts=async(req,res)=>{


    const resultPerPage=5;
    const countProduct=await product.countDocuments();
    const apifeatures=new ApiFeatures(product.find(),req.query).search().filter().pagination(resultPerPage);
    
    const products=await apifeatures.query;
    res.status(200).json({
        success:true,
        products,
        countProduct
    })
}


//Get Single Product
exports.singleProduct=async(req,res,next)=>{

    const pro=await product.findById(req.params.id);
    if(!pro)
    {
        next(new ErrorHandler("Product Not Found",404)); 
    }
    else
    {
        res.status(200).json({
            success:true,
            pro
        })
    }
}

//Update Product--Admin
exports.updateProduct=async(req,res,next)=>{

    let produc=await product.findById(req.params.id);

    if(!produc)
    {
        next(new ErrorHandler("Product Not Found",404));
    }

    produc=await product.findByIdAndUpdate(req.params.id,req.body);

    res.status(200).json({
        success:true,
        produc
    })
}

//Delete Product

exports.deleteProduct=async(req,res,next)=>{
    

    const Product=await product.findById(req.params.id);

    if(!Product)
    {
        next(new ErrorHandler("Product Not Found",404));
    }

    await product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Product deleted Successfully"
    })
}

//Create New Review or Update the Review

exports.productReview=async(req,res,next)=>{

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(req.body.rating),
        comment:req.body.comment
    }

    const Product=await product.findById(req.params.id);

    let isReviewed=false;

    Product.reviews.forEach((key)=>{

        if(review.user.toString()===key.user.toString())
        {
            isReviewed=true;
        }
    })

    if(isReviewed)
    {
        Product.reviews.forEach((key)=>{
            if(review.user.toString()===key.user.toString())
            {
                key.rating=review.rating;
                key.comment=review.comment
            }
        })
    }
    else
    {
        Product.reviews.push(review);
    }

    let countProduct=0;

    Product.reviews.forEach((rev)=>{
        countProduct=countProduct+rev.rating;
    })

    Product.rating=countProduct/Product.reviews.length;

    await Product.save();

    res.status(200).json({
        success:true,
        review,
        ratings:Product.rating
    })
}

//Get All Review

exports.getAllRiview=async(req,res,next)=>{

    const Product=await product.findById(req.params.id);

    if(!Product)
    {
        return next(new ErrorHandler("Product Not Found",400));
    }

    res.status(200).json({
        success:true,
        reviews:Product.reviews
    })

}