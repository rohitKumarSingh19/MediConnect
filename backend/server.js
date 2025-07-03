const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/db');
const app=require('./app');
//connect to MongoDB
connectDB();
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is up and running on port:${PORT}`);
})