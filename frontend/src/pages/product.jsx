import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const product = () => {

  const {productId} =useParams();
  const {products, currency, Add2Cart} =useContext(ShopContext);
  const [productData,setProductData] =useState(false);
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')

  const fetchProductData = async () => {

    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }

    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productId, products])

  return productData ? (
<div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
  <div className='flex flex-col sm:flex-row gap-12'>

    {/* LEFT SECTION: Images */}
    <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
      <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
        {productData.image.map((item, index) => (
          <img
            onClick={() => setImage(item)}
            src={item}
            key={index}
            className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
            alt=''
          />
        ))}
      </div>

      <div className='w-full sm:w-[80%]'>
        <img className='w-full h-auto' src={image} alt='' />
      </div>
    </div>

    {/* RIGHT SECTION: Product Info */}
    <div className='flex-1'>
      <h1 className='funnel-display-first text-2xl mt-2'>{productData.name}</h1>
      <div className='flex item-center gap-1 mt-2'>
        <img src={assets.star_icon} alt="" className="w-3 h-3" />
        <img src={assets.star_icon} alt="" className="w-3 h-3" />
        <img src={assets.star_icon} alt="" className="w-3 h-3" />
        <img src={assets.star_icon} alt="" className="w-3 h-3" />
        <img src={assets.star_dull_icon} alt="" className="w-3 h-3" />
        <p className='pl-2'>(122)</p>

      </div>
      <p className='mt-5 text-3xl julius-sans-one-new'>{currency}{productData.price}</p>
      <p className='mt-5 zalando-sans-second text-gray-600 md:w-4/5'>{productData.description}</p>
      <div className='flex flex-col gap-4 my-8'>
        <p>Select Size</p>
        <div className='flex gap-2'>
          {productData.sizes.map((item,index)=>(
            <button onClick={()=>setSize(item)} className={` py-2 px-4 bg-gray-200 ${item === size ? 'border border-orange-300' : ''}`} key={index}> {item}</button>
          ))}

        </div>

      </div>
      <button onClick={()=>Add2Cart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add to Cart</button>
      <hr className='mt-8 sm:w-4/5'/>
      <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
        <p>100% Original Product</p>
        <p>Cash on delivery available on this product</p>
        <p>Easy return and exchange policy within 7 days</p>

      </div>
    </div>  
  </div>

  {/* Description and review section */}
  <div className='mt-20'>
    <div className='flex'>
      <b  className='border px-5 py-3 text-sm'>Description</b>
      <p className='border px-5 py-3 text-sm'>Reviews (122)</p>

    </div>
    <div className='flex flex-col gap-4 mt-2 border px-6 py-6 text-gray-500'>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis error, voluptatem earum nesciunt nobis ad 
      ullam nihil enim labore provident quo sequi eius veritatis. Sequi assumenda temporibus minima officia obcaecati?</p>
      <p>Upgrade your wardrobe with this premium-quality cotton shirt designed for style, comfort, and versatility. Made from soft, breathable fabric, it ensures lasting comfort throughout the day, keeping you cool and confident in any setting. The shirt features a modern, tailored fit that flatters every body type, while its durable stitching guarantees long-lasting wear. Perfect for casual outings, office days, or weekend get-togethers, it pairs effortlessly with jeans, chinos, or trousers. Available in multiple colors and sizes, this shirt is a timeless essential for every modern wardrobe. Elevate your everyday look with this perfect blend of comfort, quality, and style.</p>

    

    </div>

  </div>

  {/* RELATED PRODUCTS */}
  <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
</div>

  ) : <div className='opacity-0'></div>
}

export default product
