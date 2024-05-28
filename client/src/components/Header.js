import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../features/userSlice'

const Header = () => {
    const user = useSelector(getCurrentUser)

  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between max-w-6xl mx-auto p-3'>
            <Link to={'/'}>
                <h1 className='font-bold'>Auth App</h1>        
            </Link>
            <ul className='flex gap-3'>
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                <Link to={'/about'}>
                    <li>About</li>
                </Link>
                
                <Link to={ user ? '/profile' : '/sign-in'}>
                    {user ? (
                        <>
                            <img className='h-7 w-7 rounded-full object-cover' src={user.profilePicture} alt="profile" />
                        </>
                    ):(
                        <li>Sign In</li>
                    )}
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Header