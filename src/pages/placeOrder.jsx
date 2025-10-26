import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const placeOrder = () => {


  const [method,setMethod] =useState('cod');
  const {navigate} = useContext(ShopContext);
  
  const inputStyle =
    'flex items-center justify-center border border-gray-300 rounded h-10 w-full text-center placeholder:text-center placeholder:text-gray-500 focus:outline-none focus:border-black'

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className={inputStyle} placeholder='First name' type='text' />
          <input className={inputStyle} placeholder='Last name' type='text' />
        </div>

        <input className={inputStyle} placeholder='Email address' type='email' />
        <input className={inputStyle} placeholder='Address' type='text' />

        <div className='flex gap-3'>
          <input className={inputStyle} placeholder='City' type='text' />
          <input className={inputStyle} placeholder='Postal code' type='number' />
        </div>

        <div className='flex gap-3'>
          <input className={inputStyle} placeholder='Phone Number' type='number' />
          <input className={inputStyle} placeholder='Country' type='text' />
        </div>
      </div>

      {/* Right Side */}

      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />

        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* PAYMENT METHOD */}

          <div className='flex gap-3 flex-col lg:flex-row'>

            <div onClick={()=>setMethod('stripe')} className='flex item-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method ==='stripe' ? 'bg-green-400': ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={()=>setMethod('razorpay')} className='flex item-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method ==='razorpay' ? 'bg-green-400': ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={()=>setMethod('cod')} className='flex item-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method ==='cod' ? 'bg-green-400': ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>


          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default placeOrder
