const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Customer = new Schema({
    businessName:{
        type:String
    },
    contactName:{
        type:String
    },
    Phone:{
        type:Number
    },
    Email:{
        type:String
    },
    deliveryAddress:{
        type:String
    },
    keyedEntry:{
        type:Boolean}
    ,
    earliestArrival:{
        type:Date
    },
    latestArrival:{
        type:Date
    },
    deliveryContactName:{
        type:String
    },
    deliveryContactPhone:{
        type:Number
    },
    deliveryNotes:{
        type:String
    }
})

module.exports = mongoose.model('Customer',Customer);

