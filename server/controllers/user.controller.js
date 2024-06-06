import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcrypt'

export const test = (req,res)=>{
    res.json({
        message:"Home page"
    })
}

export const updateUser = async (req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, 'Unauthorized'))
        }
        if (req.body.password){
            req.body.password = bcrypt.hashSync(req,body.password,10)
        }
        const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture}
            },{new:true}
        )
        const {password, ...rest} = updateduser._doc
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}

export const deleteUser = async (req,res, next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401,"Unauthorized"))
        }
        // const {username,email,password} = req.body
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return next(errorHandler(400,"User not found"))
        }
        res.status(200).json('User deleted successfully')
    }catch(error){
        next(error)
    }
}