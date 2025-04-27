const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const Razorpay = require("razorpay")

const instance = new Razorpay({
  key_id:'rzp_test_FuC8UMog0hrP8t',
  key_secret:'HGWRIyfbNvFDDSOX8v6Tau8K'
})

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json()) 

app.post('/order', async(req, res) => {
try{
const newOrder = await instance.orders.create({
  amount:req.body.amount,
  receipt:'CO_RP_'+Date.now()
})
res.json({
  amount:newOrder.amount,
  orderId:newOrder.id
})
}
catch(err)
{
  res.status(500).json(err)
}
})

app.get('/payment', async(req, res) => {
  try{
  const payment = await instance.payments.all()
  res.json(payment)
  }
  catch(err)
  {
    res.status(500).json(err)
  }
  })
  app.get('/customers', async(req, res) => {
    try{
    const customer = await instance.customers.all()
    res.json(customer)
    }
    catch(err)
    {
      res.status(500).json(err)
    }
    })

app.listen(8080)