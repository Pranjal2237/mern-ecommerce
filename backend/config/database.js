const mongoose=require('mongoose');


const connectDatabase=()=>{
    mongoose.connect('mongodb://localhost:27017/Ecommerce',{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Mongodb is connected with server:${data.Collection.host}`)
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports=connectDatabase