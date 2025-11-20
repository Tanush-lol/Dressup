import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  // Destructure userId from context (ensure context provides this)
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    userId, // make sure this is passed via context!
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
      let userId = null;
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId || decodedToken.id;
    }
  } catch (err) {
    console.error('Invalid token:', err);
    toast.error('Invalid token. Please log in again.');
    return;
  }

  if (!userId) {
    toast.error('User not logged in. Please log in.');
    return;
  }


    event.preventDefault();
    try {
      let orderItems = [];

      // Create orderItems from cartItems and products
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            // Make sure to use String comparison for IDs
            const itemInfo = structuredClone(products.find((p) => String(p._id) === String(items)));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error('No items in cart!');
        return;
      }

      // Ensure we have userId, cart total, etc.
      if (!userId) {
        toast.error('User not logged in. Please log in again.');
        return;
      }

      let orderData = {
        userId, // <-- required!
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        method, // optional but useful for backend
      };

      switch (method) {
        case 'cod':
        default: {
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message || 'Order failed');
          }
          break;
        }
        case 'stripe':
          const responseStripe = await axios.post(backendUrl+'/api/order/stripe', orderData,{headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error('Order error: ' + (error?.response?.data?.message || error.message));
    }
  };

  const inputStyle =
    'flex items-center justify-center border border-gray-300 rounded h-10 w-full text-center placeholder:text-center placeholder:text-gray-500 focus:outline-none focus:border-black';

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left: Delivery form */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputStyle} placeholder='First name' type='text' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputStyle} placeholder='Last name' type='text' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputStyle} placeholder='Email address' type='email' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputStyle} placeholder='Street' type='text' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className={inputStyle} placeholder='City' type='text' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className={inputStyle} placeholder='State' type='text' />
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className={inputStyle} placeholder='Postal code' type='number' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className={inputStyle} placeholder='Phone Number' type='number' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className={inputStyle} placeholder='Country' type='text' />
        </div>
      </div>

      {/* Right: Order summary & payment */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Methods */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
