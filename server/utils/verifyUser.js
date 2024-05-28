import { errorHandler } from "./error.js"

export const verifyToken = (req,res,next)=>{
    try{
        const token = req.cookies.access_token
        if(!token){
            return next(errorHandler(401, 'Access denied'))
        }
        JsonWebTokenError.verify(token,process.env.JWT_SECRET, (err,user)=>{
            if(err) return next(errorHandler(403, 'User not logged in'))
                req.user = user
            next()
        })
    }catch(error){
        // next(error)
        console.log(error)
    }
}