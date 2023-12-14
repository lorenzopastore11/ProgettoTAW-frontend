const config = require('config.json');
const db = require('../db');
const { ObjectId } = require('mongodb');
//const { options } = require('cli');
//const dishModel = require('../dishes/dish.model');
const Orders = db.Orders;
const Tables = db.Tables;
const Dishes = db.Dishes;

module.exports = {
    create,
    get,
    update,
    delete: _delete,
    //deleteDish
};

async function create(orderParam) {

    let order = await Orders.findOne().sort({ orderId: "desc" }).limit(1)
    if (order)  {  
        orderParam.orderId = order.orderId+1;
    }
    else {
        orderParam.orderId = 1;
    }

    orderParam.dateCreation = new Date();
    order = new Orders(orderParam);
    await order.save();

    const table = await db.Tables.findOne({tableId: order.tableId})
    table.orderId = order.orderId;
    return await table.save();

}

async function get(orderId) {
    
    if(orderId === "undefined") return await Orders.find();
    else {
        //const a = Orders.findOne({tableId: param}); 
        //console.log(a); 
        return await Orders.find( {orderId});
    };
}



async function update(orderId, body, id) {
    
    if(id === "undefined") { //Voglio inserire un piatto in dishes

        const dishtype = await Dishes.findOne({name: body.name})
        body.category = dishtype.type;
        body.price = dishtype.price;
        body.id = new ObjectId();
        return await Orders.findOneAndUpdate({orderId: orderId}, {$push: {dishes: body}})   

    }
    else if(id === "-1"){ //aggiorno paymentrequest
        console.log(body)
        return await Orders.findOneAndUpdate({orderId: orderId}, {paymentRequest: body.paymentRequest})
    }
    else if(id === "-2") { //aggiorno payed
        const order = await Orders.findOne({orderId: orderId}) 
        await Tables.findOneAndUpdate({tableId: order.tableId}, {orderId: null});
        order.payed = body.payed;
        order.totalCost = body.totalcost;
        return await order.save();
    }
    else {
        const order = await Orders.findOne({orderId: orderId})
        const dish = order.dishes.find(x => x.id === id);
        if(dish.state === "INSERITO")
            dish.state = "INVIATO";
        else if(dish.state === "INVIATO")
            dish.state = "IN PREPARAZIONE";
        else if(dish.state === "IN PREPARAZIONE")
            dish.state = "PRONTO"
        else if(dish.state === "PRONTO")
            dish.state = "CONSEGNATO";
        
        return await order.save();
    }
}

async function _delete(orderId, id) {
    if(id === "undefined") {
        const order = await Orders.findOne({orderId: orderId}) 
        await Tables.findOneAndUpdate({tableId: order.tableId}, {orderId: null});
        await Orders.findByIdAndDelete(order.id);
    }
    else {
        const order = await Orders.findOne({orderId: orderId});
        const i = order.dishes.findIndex(x => x.id === id);
        order.dishes.splice(i, 1);
        return await order.save();
    }
}