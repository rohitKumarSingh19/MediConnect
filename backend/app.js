const express=require('express');
const cors=require('cors');
const userRoutes=require('./routes/user.routes');
const verifyToken=require('./middleware/auth.middleware');
const app=express();
app.use(cors());
app.use(express.json())
//Routes
app.use('/api/users',userRoutes);
module.exports=app;