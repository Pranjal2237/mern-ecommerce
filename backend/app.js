const express=require('express');

const app=express();

const cookieParser=require('cookie-parser')

const errorMiddleWare=require('./middleware/error')

app.use(express.json());

app.use(cookieParser());

//Route Imports

const product=require('./routes/productRoute');

const user=require('./routes/userRoute');

const order=require('./routes/orderRoute');

app.use('/app/v1',product);

app.use('/app/v1',user);

app.use('/app/v1',order);
//MiddleWare for Errors

app.use(errorMiddleWare);

module.exports=app;