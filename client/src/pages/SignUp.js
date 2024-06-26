import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../features/userSlice'
import OAuth from '../components/OAuth'
import { getLoading, getError } from '../features/userSlice'

const SignUp = () => {
  const [formData,setFormData] = useState({})
  const dispatch = useDispatch()
  // const {loading,error} = useSelector(state => state.user)
  const loading = useSelector(getLoading)
  const error = useSelector(getError)
  
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      dispatch(signInStart())

      const res = await fetch('http://localhost:4000/auth/signup',{
        method:"POST",
        body: JSON.stringify(formData),
        headers:{'Content-Type':'application/json'}
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      console.log(data)
      navigate('/sign-in')

    }catch(error){
      dispatch(signInFailure(error))
      console.log(error)
    }
  }
  return (
    <div onSubmit={handleSubmit} className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" name="username" id="username" placeholder='Username'
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="text" name="email" id="email" placeholder='Email'
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" name="password" id="password" placeholder='Password'
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button type="submit" disabled={!loading} className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{!loading ? 'Loading' : 'Sign up'}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-500'>{error ? error.message || 'Something went wrong' : ''}</p>
    </div>
  )
}

export default SignUp