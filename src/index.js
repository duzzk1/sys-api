const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const port = 3001
const Invoice = mongoose.model('Invoice', { 
    title: String,
    value: String,
    number: String 
});

app.use(cors());
app.post('/saveInvoice', async (req, res)=>{
    const invoice = new Invoice({
        title: req.body.title,
        value: req.body.value,
        number: req.body.number
    });
    await invoice.save()
    res.send(invoice)
})

app.get('/', async (req, res) => {
    res.send('Invoice request api!')

})

app.get('/invoices/', async (req, res) => {
    const invoices = await Invoice.find();
    res.send(invoices)
})

app.get('/invoice/:number', async (req, res) => {
    const invoice = await Invoice.findOne({ number: req.params.number });
    if (!invoice) {
        res.send('None invoices find!')
    }else{
        res.send(invoice)
    }
})
  

app.listen(port, () => {
    mongoose.connect('mongodb+srv://duzzk:Xk7RaBs7jVCjvA@sys-api.v4mvzcj.mongodb.net/?retryWrites=true&w=majority&appName=sys-api');
})