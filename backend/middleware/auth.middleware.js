const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json(({message:"No token, auth denied"}));
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
         console.log("Decoded JWT:", decoded); // ADD THIS
        next();
    }catch(error){
        console.log('❌ Token verification failed:', error.message);
        res.status(401).json({message:"Token is not valid"})
    }
};
module.exports=verifyToken;;