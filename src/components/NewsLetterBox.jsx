import React from 'react'

const NewsLetterBox = () => {
    

    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div>
        <div className='text-center pt-20'>
            <p className='text-2xl funnel-display-first text-gray-800'>
                Subscribe now and get 20% off your next purchase
            </p>
            <p className='funnel-display-first text-gray-500 mt-3'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.

            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none'/>
                <button type='submit'className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>

            </form>

        </div>
      
    </div>
  )
}

export default NewsLetterBox
