import React ,{use, useContext,useEffect,useState}from 'react'
import { ShopContext } from '../context/ShopContext'
import {assets} from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const collection = () => {

  const{products, search ,showSearch} =useContext(ShopContext)
  const [showFilter,setShowFilter]=useState(false)
  const[filterProducts,setFilterProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relevent');

  const toggleCategory= (e) =>{
    if(category.includes(e.target.value)){
      setCategory (prev=>prev.filter(item=> item !== e.target.value ))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory= (e) =>{
    if (subCategory.includes(e.target.value)){
      setSubCategory (prev=>prev.filter(item=> item !== e.target.value ))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const ApplyFilter = () => {
    let productsCopy=products.slice()

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length>0){
      productsCopy= productsCopy.filter(item=> category.includes (item.category) )
    }

    if(subCategory.length>0){
      productsCopy= productsCopy.filter(item=> subCategory.includes (item.subCategory) )
    }

    setFilterProducts(productsCopy);
  }

  const SortProducts = () => {
     let FPcopy = filterProducts.slice();

     switch(sortType){
      case 'low-high':
        setFilterProducts(FPcopy.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setFilterProducts(FPcopy.sort((a,b)=>(b.price-a.price)))
        break;
      default:
        ApplyFilter(FPcopy);
        break;
     } 
  }


  useEffect(()=>{
    ApplyFilter(); 

  },[category,subCategory,search,showSearch])

  useEffect(()=>{
    SortProducts();

  },[sortType])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filer Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-[30px] flex items-center cursor-pointer gap-2 poiret-one-regular'>FILTERS</p>
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        {/* Category Filter */}
        <div className={`border rounded-[10px] border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium funnel-display-first '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2  zalando-sans-second'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2 zalando-sans-second'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2 zalando-sans-second'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>

          </div>

        </div>


        {/* Category Filter */}
        <div className={`border rounded-[10px] border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium funnel-display-first'>SUB CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 zalando-sans-second'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2 zalando-sans-second'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2 zalando-sans-second'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear 
            </p>

          </div>

        </div>

      </div>

      {/* Right side */}
      <div className='flex-1 '>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'COLLECTIONS'}/>
          {/* PRODUCT SORT */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 rounded-[5px] red-hat-display-regular border-gray-300 text-sm px-2'>
            <option className='red-hat-display-regular' value="relevent">Sort by: Relevent</option>
            <option className='red-hat-display-regular' value="low-high">Sort by: Low to High</option>
            <option className='red-hat-display-regular' value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* MAP PRODUCTS */}
        <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }

          
        </div>

      </div>

    </div>
  )
}

export default collection
