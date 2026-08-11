import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){
    const header=req.headers.authorization
    if(!header){
        return res.status(400).json({
            message:"No token is provided"
        })
    }
    const token=header.split(' ')[1]
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res(400).json({
                message:`Invalid token`
            })
        }
        req.userId=decoded.id 
        next()
    })
}

export default authMiddleware