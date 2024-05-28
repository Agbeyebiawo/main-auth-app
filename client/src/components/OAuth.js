import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../features/userSlice'

const OAuth = () => {
    const dispatch = useDispatch()

    const handleGoogelClick = async()=>{
        try{
            const provider = new GoogleAuthProvider() 
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            // console.log(result)
            const res = await fetch('http://localhost:4000/auth/google',{
                method: "POST",
                body: JSON.stringify({
                    username: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
        }catch(error){
            console.log("couldn't log in with google",error)
        }
    }
  return (
    <div type='button' onClick={()=>handleGoogelClick()} className='bg-red-700 text-center text-white rounded-lg p-3 uppercase hover:opacity-95'>
        Continue with google
    </div>
  )
}

export default OAuth