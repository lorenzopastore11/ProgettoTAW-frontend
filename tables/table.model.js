const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    tableId: { type: Number, unique: true, required: true },
    orderId: {type: Number},
    seats: { type: Number, required: true },
    assignedTo: { type: String, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Tables', schema);