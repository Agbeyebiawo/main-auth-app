import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" name="username" id="username" placeholder='Username'
        className='bg-slate-100 p-3 rounded-lg'/>
        <input type="text" name="email" id="email" placeholder='Email'
        className='bg-slate-100 p-3 rounded-lg'/>
        <input type="text" name="password" id="password" placeholder='Password'
        className='bg-slate-100 p-3 rounded-lg'/>
        <button type="submit" className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp