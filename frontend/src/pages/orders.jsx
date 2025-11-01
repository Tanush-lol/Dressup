import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders = () => {

  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            {/* Left section (image + info) */}
            <div className='flex items-start gap-6 text-sm md:flex-1'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base text-gray-600 font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-500 whitespace-nowrap'>
                  <span className='text-lg'>{currency} {item.price}</span>
                  <span>Quantity: 1</span>
                  <span>Size: M</span>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>25, July, 2024</span></p>
              </div>
            </div>

            {/* Right section (status + button) */}
            <div className='flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 md:w-1/3'>
              <div className='flex items-center gap-2'>
                <span className='min-w-2 h-2 rounded-full bg-green-500'></span>
                <p className='text-sm md:text-base text-black'>Ready To Ship</p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm text-black'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
