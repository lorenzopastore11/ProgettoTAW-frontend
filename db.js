const config = require('config.json');
const mongoose = require('mongoose');
//const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString); //connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Users: require('./users/user.model'),
    Tables: require('./tables/table.model'),
    Dishes: require('./dishes/dish.model'),
    Orders: require('./orders/order.model'),
};