import jwt from 'jsonwebtoken'

function authMiddileware(req,res,next){
   // const {token}=req.headers['authorization']
   const authHeader= req.headers.authorization

    if(!authHeader){ 
        return res.status(401).json({
            message:"No token is provided"
        })
    }
    const token= authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message:"Invalid Token"
            })
        }
        req.userId=decoded.id
        next()
    })
}
export default authMiddileware