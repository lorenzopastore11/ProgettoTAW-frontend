const mongoose = require('mongoose');
//const { Dishes } = require('../dishes/dish.model');
const Schema = mongoose.Schema;

const schema = new Schema({
    orderId: {type: Number, unique: true, required: true},
    tableId: { type: Number},
    dateCreation: {type: Date},
    covers: { type: Number },
    totalCost: {type: Number, default: 0.00},
    dishes: [
        {
            id: String,
            name: String,
            state: String,
            price: Number,
            category: String
        }
    ],
    paymentRequest: {type: Boolean, default: false},
    payed: {type: Boolean, default: false}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        //delete ret._id;
    }
});

module.exports = mongoose.model('Orders', schema);