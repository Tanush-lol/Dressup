import React from 'react'
import Title from '../components/Title1'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      {/* ABOUT US Title */}
      <div className='text-4xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* ABOUT US Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to DressUp, your ultimate fashion destination. At DressUp, we believe fashion is more than just clothing—it’s self-expression. Our curated collection brings you the latest trends, timeless classics, and exclusive designs for every occasion. Whether you’re looking for chic casual wear, elegant evening outfits, or stylish accessories, DressUp has something for everyone.
            We source high-quality pieces from trusted designers and emerging brands to ensure you always look and feel your best. With easy navigation, secure payments, and fast shipping, shopping online has never been this effortless.
            Discover personalized style recommendations, seasonal sales, and exclusive member discounts when you join the DressUp community. Refresh your wardrobe today and make every outfit a statement. DressUp is where style meets confidence.
          </p>

          <p>
            At DressUp, we go beyond ordinary online shopping by delivering a truly personalized fashion experience. Unlike other e-commerce websites, we focus on quality, style, and individuality. Every product is carefully selected for its design, comfort, and durability, ensuring you get exceptional value. Our user-friendly interface, quick delivery, and responsive customer support make your shopping journey smooth and enjoyable. We also offer personalized recommendations, exclusive member rewards, and frequent style updates to keep you ahead of the trends. With DressUp, you don’t just shop—you discover fashion that fits your lifestyle, confidence, and personality better than anywhere else.
          </p>

          <div>
          <button className='text-gray-800'>OUR MISSION</button>
          <p>
            Our mission at DressUp is to empower individuals to express their unique style with confidence and ease. We aim to make fashion accessible, enjoyable, and inspiring for everyone by offering high-quality, trend-forward clothing and accessories at affordable prices. Through innovation, sustainability, and customer-focused service, we strive to redefine online shopping and create a community where style meets self-expression, helping every customer look good, feel good, and embrace their individuality every day.
          </p>
          </div>


        </div>
      </div>

            {/* WHY CHOOSE US Section */}
      <div className='text-4xl text-center mt-20'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      
      <div className='flex flex-col md:flex-row justify-between items-stretch gap-6 text-sm mb-20'>
      
        <div className='border flex-1 px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
          <b className='text-xl'>QUALITY ASSURANCE</b>
          <p className='text-gray-600'>blah blah about how i provide quality assurance and self dick riding.</p>
        </div>
      
        <div className='border flex-1 px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
          <b className='text-xl'>CONVENIENCE</b>
          <p className='text-gray-600'>blah blah about how we are better and convience and more self dick riding w sucking.</p>
        </div>
      
        <div className='border flex-1 px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5'>
          <b className='text-xl'>EXCEPTIONAL CUSTOMER SERVICE</b>
          <p className='text-gray-600'>i ain't over here to write a marketins sccript go imagine what a website like this would have over here.</p>
        </div>
      
      </div>

      <NewsLetterBox />
      
      </div>
  )
}

export default About
