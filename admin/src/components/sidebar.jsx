import { memo } from 'react';
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-64 md:w-20 lg:w-64 min-h-screen border-r transition-all duration-200'>
      <div className='flex flex-col gap-4 pt-6 pl-4 md:pl-0 lg:pl-6 text-[15px]'>

        <NavLink className='flex items-center justify-start md:justify-center lg:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l w-full' to="/add">
          <img className='w-6 h-6 flex-shrink-0' src={assets.add_icon} alt="" />
          <p className='hidden lg:block'>Add Items</p>
        </NavLink>

        <NavLink className='flex items-center justify-start md:justify-center lg:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l w-full' to="/list">
          <img className='w-6 h-6 flex-shrink-0' src={assets.order_icon} alt="" />
          <p className='hidden lg:block'>List Items</p>
        </NavLink>

        <NavLink className='flex items-center justify-start md:justify-center lg:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l w-full' to="/order">
          <img className='w-6 h-6 flex-shrink-0' src={assets.add_icon} alt="" />
          <p className='hidden lg:block'>Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default memo(Sidebar);