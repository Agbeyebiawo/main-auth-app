import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    try{
        console.log(req.cookies)
        const token = req.cookies

        if(!token){
            return next(errorHandler(401, 'Access denied'))
        }
        jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
            if(err) return next(errorHandler(403, 'Invalid token'))
            
            req.user = user
            next()
        })
    }catch(error){
        // next(error)
        console.log(error)
    }
}