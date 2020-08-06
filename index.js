const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = express.Router();

app.use(bodyParser.json());
app.use(cors());
app.use('/customers',customerRoutes);

customerRoutes.route('/').get((req,res)=>{
    Customer.find((err,customers) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(customers);
        }
    });
});

customerRoutes.route('/:id').get((req,res) =>{
    let id = req.params.id;
    Customer.findById(id,(err,customer)=>{
        res.json(customer);
    });
});

customerRoutes.route('/add').post((req,res)=>{
    let customer = new Customer(req.body);
    customer.save()
    .then(customer=>{
        res.status(202).json({'customer':'Customer added successfully'});
    })
    .catch(err =>{
        res.status(404).send('Adding new customer failed');
    });
});

customerRoutes.route('/update/:id').post((req,res)=>{
    Customer.findById(req.params.id,(err,customer)=>{
        if(!customer){
            res.status(404).send("Customer not found!");
        }
        else{
            customer.businessName = req.body.businessName;
            customer.contactName = req.body.contactName;
            customer.Phone = req.body.Phone;
            customer.Email = req.body.Email;
            customer.deliveryAddress = req.body.deliveryAddress;
            customer.keyedEntry = req.body.keyedEntry;
            customer.earliestArrival = req.body.earliestArrival;
            customer.latestArrival = req.body.latestArrival;
            customer.deliveryContactName = req.body.deliveryContactName
            customer.deliveryContactPhone = req.body.deliveryContactPhone;
            customer.deliveryNotes = req.body.deliveryNotes;

            customer.save()
            .then(customer =>{
                res.json("Customer updated!");
            })
            .catch(
                err =>{
                    res.status(404).send("Update failed");
                }
            );
        }
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/customers',{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("Database is successfully connected to customers");
})

const port = process.env.PORT || 5000;

let Customer = require('./customer.model');


app.listen(port, () => {console.log(`Customer backend running on port ${port} `)});
