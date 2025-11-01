import React from 'react'
import {assets} from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
 <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 my-10 mt-40 text-sm'>
            {/* First Column - Logo and Description */}
            <div className='space-y-4'>
                <img src={assets.logo} alt="Logo" className='w-32'/>
                <p className='text-gray-600 julius-sans-one-regular'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad esse vero aut veritatis quis. Quaerat dolores, iste fugit ut eos architecto dolorum nostrum fugiat illum, provident in quam accusantium sequi!
                </p>
            </div>

            {/* Second Column - Company Links */}
            <div className='flex flex-col items-start sm:items-center'>
                <p className='text-xl font-medium mb-5 zalando-sans-first'>
                    COMPANY
                </p>
                <ul className='flex flex-col gap-1.5 text-gray-600'>
                    <li className='julius-sans-one-heavy hover:text-black cursor-pointer'>Home</li>
                    <li className='julius-sans-one-heavy hover:text-black cursor-pointer'>About Us</li>
                    <li className='julius-sans-one-heavy hover:text-black cursor-pointer'>Delivery</li>
                    <li className='julius-sans-one-heavy hover:text-black cursor-pointer'>Privacy Policy</li>
                </ul>
            </div>

            {/* Third Column - Contact Info */}
            <div className='flex flex-col items-start sm:items-center'>
                <p className='text-xl mb-5 zalando-sans-first'>Get in Touch</p>
                <ul className='flex flex-col gap-10 text-gray-600'>
                    <li className='hover:text-black cursor-pointer julius-sans-one-heavy'>+1-1212132131</li>
                    <li className='hover:text-black cursor-pointer julius-sans-one-heavy'>help.consumer@dressup.com</li>
                    <li className='hover:text-black cursor-pointer julius-sans-one-heavy'><link rel='assets.behance_logo' href="https://www.behance.net/tanushroy"/></li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center funnel-display-first'>Copyright 2024@ dressup.com- All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer