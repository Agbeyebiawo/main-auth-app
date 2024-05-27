import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'

const SignUp = () => {
  const [formData,setFormData] = useState({})
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  // const [error]
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const res = await fetch('http://localhost:4000/auth/signup',{
        method:"POST",
        body: JSON.stringify(formData),
        headers:{'Content-Type':'application/json'}
      })
      const data = await res.json()
      setLoading(false)
      if(data.success === false){
        setError(true)
      }
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <div onSubmit={handleSubmit} className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" name="username" id="username" placeholder='Username'
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="text" name="email" id="email" placeholder='Email'
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" name="password" id="password" placeholder='Password'
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button type="submit" disabled={loading} className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading' : 'Sign up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-500'>{error ? 'Something went wrong' : ''}</p>
    </div>
  )
}

export default SignUp