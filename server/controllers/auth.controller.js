import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const signup = async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = new User({username:username,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:'User created successfully'})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}