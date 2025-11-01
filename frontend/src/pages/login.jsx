import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <div className='flex items-center justify-center min-h-[400px] min-w-[300px]'>
  <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 gap-4 text-gray-800 bg-white p-6 rounded-2xl shadow-md'>
        <div className='inline-flex items-center gap-2 mb-2 mt-2'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>

        {currentState === 'login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' required/>}
        <input type="email" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email' required/>
        <input type="password" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password' required/>

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot Yo Password</p>
          {
            currentState === 'login' 
            ?  <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={()=>setCurrentState('login')} className='cursor-pointer'>Already have an account?</p >
          }

        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'login' ? 'Sign In' : 'Sign Up'}</button>

      </form>
    </div>
  )
}

export default Login
