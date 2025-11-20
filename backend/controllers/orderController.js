import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const currency =  'usd'
const deliveryCharge = 10;

//stripe gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing orders using COD

const placeOrder= async (req,res) => {
    try {
        const {userId,items,amount,address} =req.body;
        const orderData = {
            userId,items,amount,address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder= new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} });


        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map(item => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,          // ✅ FIXED
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.query;
    if (success !== "true") {
      return res.json({ success: false, message: "Payment failed or cancelled." });
    }


    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found." });
    }

    if (order.payment === true) {
      return res.json({ success: true, message: "Payment already verified.", order });
    }

    order.payment = true;
    await order.save();

    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

    return res.json({
      success: true,
      message: "Payment verified successfully!",
      order,
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


//All order data for admin panel

const allOrders= async (req,res) => {
    try {
        const orders= await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

//user order data for frontend

const userOrders = async (req, res) => {
  try {
    const userId = req.userId; 
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//update order status from Admin Panel
// update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: "Status updated", order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {placeOrder,placeOrderStripe,verifyStripe,allOrders,userOrders,updateStatus}