const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        ref: 'Users',
        required:true,
    },
    items: [{
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'course',
            required:true,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number
    }],
    totalPrice: {
        type: Number,
        required: true
      },
      paymentMethod: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Cart',CartSchema);