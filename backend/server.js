const app=require('./app');

const dotenv=require('dotenv')
const connectDatabase=require('./config/database')


dotenv.config({path:"backend/config/dotenv.config.env"});


//connecting database

connectDatabase();

app.listen(4000,()=>{
    console.log(`server is working on http://localhost:4000`);
});