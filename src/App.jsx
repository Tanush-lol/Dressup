import React from 'react'
import { Routes } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/collection'
import About from './pages/About'
import Content from './pages/Content'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import { Route } from 'react-router-dom'
import Navabar from './components/navbar'
import './index.css'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className="px=-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      
      <Navabar/>

        <Routes>
            <Route  path='/' element={<Home/>} />
            <Route path='/collection' element={<Collection/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/content' element={<Content/>} />
            <Route path='/content' element={<Content/>} />
            <Route path='/product/:productId' element={<Product/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/place-order' element={<PlaceOrder/>} />
            <Route path='/orders' element={<Orders/>} />
        </Routes>

        <Footer/>

      
    </div>
  )
}

export default App
