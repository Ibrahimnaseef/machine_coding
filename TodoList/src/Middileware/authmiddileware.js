import jwt from "jsonwebtoken";

function authMiddileware(req,res,next){
    const token=req.headers['authorization']
    if(!token){ return res.status(401).json({message:"No token is provided"})}
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){  return res.status(401).json({message:"Invalid Token"})}
        req.userId=decoded.id
        next()
        

    })
   
}

export default authMiddileware