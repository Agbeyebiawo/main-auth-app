import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO).
then(()=>console.log('db connected')).catch(err=>{
    console.log(err)
})

app.use(cors({
    origin:['http://localhost:3000'],
    methods: ['GET','POST','PUT','DELETE']
}))
app.use(express.json())

app.listen(4000,()=>{
    console.log('server started')
})

app.use('/auth',userRouter)
app.use('/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internet Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})
