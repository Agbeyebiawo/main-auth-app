import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouter = () => {
    const {user} = useSelector(state=>state.user)
  return (
    user !== null ? <Outlet /> : <Navigate to='/sign-in'/>
  )
}

export default PrivateRouter