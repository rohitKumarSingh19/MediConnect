const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }
    catch(error){
        console.log('Connection Failed',error.message);
    }
}
module.exports=connectDB;