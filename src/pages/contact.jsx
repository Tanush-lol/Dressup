import React from 'react'
import Title from '../components/Title1'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const content = () => {
  return (
    <div>
      <div className='text-center text-4xl'>
        <Title text1={'CONTACT'} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-5'>
          <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
          <p className='text-gray-500'>DressUp HQ, 123 Fashion Avenue, <br /> Style City, CA 90210, <br /> United States</p>
          <p className='text-gray-500'>Phone: (123) 456-7890 <br />info@dressup.com</p>

          <p className='font-semibold text-xl text-gray-600'>Carrers at DressUp</p>
          <p className='text-gray-500'>Join our team and help us shape the future of fashion. We’re always looking for talented individuals who are passionate about style and customer service.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-400 text-gray-800'>Explore Jobs</button>

        </div>

      </div>
      <NewsLetterBox />
      
    </div>
  )
}

export default content
