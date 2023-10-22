const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.ObjectId,ref :"User" }, // Reference to the buyer user
  seller: { type: mongoose.Schema.ObjectId,ref :"User"}, // Reference to the seller user
  details: {  
    contact : {type : Number},
    address :{type : String},
    pincode : {type: Number, min:100000 , max :999999}
    },
  products: [{ type: mongoose.Schema.Types.ObjectId }], // List of products in the order
});

module.exports = mongoose.model('Order', orderSchema);
