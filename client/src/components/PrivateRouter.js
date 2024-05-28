import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { getCurrentUser } from '../features/userSlice'

const PrivateRouter = () => {
    const user = useSelector(getCurrentUser)
  return (
    user !== null ? <Outlet /> : <Navigate to='/sign-in'/>
  )
}

export default PrivateRouter