import React from 'react'
import {assets} from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 py-20'>
        <div className='flex flex-col items-center'>
            <img src={assets.exchange_icon} alt="Exchange Policy" className='w-12 h-12 mb-5'/>
            <p className='font-semibold text-center'>Easy Exchange Policy</p>
            <p className='text-gray-400 text-center text-xs sm:text-sm md:text-base'>
                We offer hastle free exchange policy
            </p>
        </div>

        <div className='flex flex-col items-center'>
            <img src={assets.quality_icon} alt="Return Policy" className='w-12 h-12 mb-5'/>
            <p className='font-semibold text-center'>7 Days return policy</p>
            <p className='text-gray-400 text-center text-xs sm:text-sm md:text-base'>
                We provide 7 days free return policy
            </p>
        </div>

        <div className='flex flex-col items-center'>
            <img src={assets.support_img} alt="Customer Support" className='w-12 h-12 mb-5'/>
            <p className='font-semibold text-center'>Best Customer Support</p>
            <p className='text-gray-400 text-center text-xs sm:text-sm md:text-base'>
                24/7 customer support
            </p>
        </div>
    </div>
  )
}

export default OurPolicy