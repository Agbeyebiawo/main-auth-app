import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'

export const signup = async(req,res,next)=>{
    try{
        const {username,email,password} = req.body
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = new User({username:username,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:'User created successfully'})
    }catch(error){
        // res.status(400).json({message:error.message})
        next(error)
    }
}

export const signin = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(401,'Invaild credentials'))
        }
        const comparePassword = bcrypt.compareSync(password,validUser.password)
        if(!comparePassword){
            return next(errorHandler(401,'Wrong credentials'))
        }
        const token = await jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:hashedPassword, ...rest} = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000)
        res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
    }catch(error){
        next(error)
    }
}

export const google = async (req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
            const expiryDate = new Date(Date.now() + 3600000)
            const {password:hashedPassword, ...rest} = user._doc
            res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
        }else{
            const {username,email,photo} = req.body
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatedPassword,10)
            const newUser = new User({username:username.slipt(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8)
                ,email,password:hashedPassword,profilePicture:photo})
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
            const {password:hashedPassword2,...rest} = newUser._doc
            const expiryDate = new Date(Date.now() + 3600000)
            res.cookie('access_token',token,{
                httpOnly:true,
                expires: expiryDate
            }).status(200).json(rest)
        }
    }catch(error){
        next(error)
    }
}