import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {user} = useSelector(state=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
         {/* <img src={user.profilePicture} alt="profile" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' /> */}
         <input defaultValue={user.username} type="text" name="username" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3'/>
         <input defaultValue={user.email} type="text" name="email" id="email" placeholder='Email' className='bg-slate-100 rounded-lg p-3'/>
         <input defaultValue={user.password} type="password" name="password" id="password" placeholder='Password' className='bg-slate-100 rounded-lg p-3'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile