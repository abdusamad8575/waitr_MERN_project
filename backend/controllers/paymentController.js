const dotenv = require('dotenv')
const RazorPay = require('razorpay')
dotenv.config()

const {RAZORPAY_ID_KEY,RAZORPAY_SECRET_KEY} = process.env;



const razorpay = async(req,res)=>{
    try {
        var instance = new RazorPay({
            key_id:RAZORPAY_ID_KEY,
            key_secret:RAZORPAY_SECRET_KEY
          })
          let razorpayOrder = await instance.orders.create({
            amount: parseInt(req?.body?.total)*100,
            currency:'INR',
            receipt:'sdfohgoes86t94e'
          })
          console.log('Order created', razorpayOrder);
          res.json({
            order_id:razorpayOrder.id,
            total:  req.body.total,
            key_id: RAZORPAY_ID_KEY, 
          });
        // const {total} =req.body
        // console.log(total);
        // const options = {
        //     amount: total, 
        //     currency: "INR",
        //     receipt: "samadns8575@gmail.com"
        //   };
        //   razorpayInstance.orders.create(options, (err, order)=> {
        //     // console.log(order);
        //     if(!err){
        //         return res.status(200).json({
        //             success:true,
        //             msg:'Order Created',
        //             order_id:order.id,
        //             amount:total,
        //             key_id:RAZORPAY_ID_KEY,
        //         })
        //     }else{
        //         return res.status(400).json({ message: 'Something went wrong!' });
        //     }
        //   })
        // const order = await razorpayInstance.orders.create(options);

        // return res.json({ order_id: order.id });
        
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ error: "Unable to create order" });
    }
}

module.exports = {
    razorpay
}