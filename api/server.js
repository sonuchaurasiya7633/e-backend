const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: 'rzp_test_FuC8UMog0hrP8t',
  key_secret: 'HGWRIyfbNvFDDSOX8v6Tau8K'
});

module.exports = async (req, res) => {
  if (req.method === 'POST' && req.url === '/order') {
    try {
      const body = await getBody(req);
      const newOrder = await instance.orders.create({
        amount: body.amount,
        receipt: 'CO_RP_' + Date.now()
      });
      res.statusCode = 200;
      res.json({ amount: newOrder.amount, orderId: newOrder.id });
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: err.message });
    }
  } 
  else if (req.method === 'GET' && req.url === '/payment') {
    try {
      const payments = await instance.payments.all();
      res.statusCode = 200;
      res.json(payments);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: err.message });
    }
  } 
  else if (req.method === 'GET' && req.url === '/customers') {
    try {
      const customers = await instance.customers.all();
      res.statusCode = 200;
      res.json(customers);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: err.message });
    }
  } 
  else {
    res.statusCode = 404;
    res.json({ message: "Not Found" });
  }
};

async function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => resolve(JSON.parse(body)));
    req.on('error', reject);
  });
}
