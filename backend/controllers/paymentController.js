const dotenv = require('dotenv')
const Razorpay = require('razorpay')
dotenv.config()

const {RAZORPAY_ID_KEY,RAZORPAY_SECRET_KEY} = process.env;


const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY,
  });
const razorpay = async(req,res)=>{
    try {
        const {total} =req.body
        console.log(total);
        const options = {
            amount: total, 
            currency: "INR",
            receipt: "samadns8575@gmail.com"
          };
          razorpayInstance.orders.create(options, (err, order)=> {
            // console.log(order);
            if(!err){
                return res.status(200).json({
                    success:true,
                    msg:'Order Created',
                    order_id:order.id,
                    amount:total,
                    key_id:RAZORPAY_ID_KEY,
                })
            }else{
                return res.status(400).json({ message: 'Something went wrong!' });
            }
          })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    razorpay
}