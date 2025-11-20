import express from 'express'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'
import {placeOrder,verifyStripe,placeOrderStripe,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'

const orderRouter = express.Router()

//ADMIN ONLY
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//Payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

//User Feature
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/order/status', updateStatus);

//verify payemnt
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;