import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

  const [orders,setOrders] = useState([])

  const fetchAllOrders= async () => {
    if (!token) {
      return null;
    }
    try {
      
      const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  const statusHandler = async (event,orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId, status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-start"
        >
          {/* Left: Icon + basic info */}
          <div className="flex flex-1 gap-3">
            <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="h-6 w-6 object-contain"
              />
            </div>
    
            <div className="flex-1 space-y-2">
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.date).toLocaleDateString()} •{" "}
                    {order.items.length} items
                  </p>
                </div>
    
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {currency} {order.amount}
                  </p>
                  <p
                    className={`text-xs ${
                      order.payment ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    Payment: {order.payment ? "Done" : "Pending"}
                  </p>
                </div>
              </div>
    
              {/* Items */}
              <div className="rounded-md bg-gray-50 p-2">
                <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                  Items
                </p>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {item.name} x {item.quantity}{" "}
                      <span className="text-xs text-gray-500">
                        ({item.size})
                      </span>
                      {index !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
              </div>
    
              {/* Address */}
              <div className="grid gap-1 text-sm text-gray-700">
                <p className="text-xs font-semibold uppercase text-gray-500">
                  Shipping address
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-xs text-gray-500">
                  Phone: {order.address.phone}
                </p>
              </div>
            </div>
          </div>
    
          {/* Right: Status + meta */}
          <div className="flex w-full flex-col gap-3 border-t pt-3 md:w-52 md:border-t-0 md:border-l md:pl-3">
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="text-xs font-semibold uppercase text-gray-500">
                  Payment method:
                </span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="text-xs font-semibold uppercase text-gray-500">
                  Current status:
                </span>{" "}
                {order.status || "Order Placed"}
              </p>
            </div>
    
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`status-${order._id}`}
                className="text-xs font-semibold uppercase text-gray-500"
              >
                Update status
              </label>
              <select
                id={`status-${order._id}`}
                value={order.status || "Order Placed"}
                onChange={(e) => statusHandler(e, order._id)}
                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>


  )
}

export default Orders
