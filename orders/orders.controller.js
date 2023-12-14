const express = require('express');
const router = express.Router();
const orderService = require('./orders.service');
const { options } = require('cli');

const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
        methods: ['GET', 'POST', 'PUT'],
    }
});

// routes
router.post('/orders', create);
router.get('/orders', get);
router.delete('/orders', _delete);
//router.delete('/orderss/:orderId/:i', deleteDish);
//router.get('/orders/:id', getById);
router.put('/orders/:orderId', update);
//router.patch('/orderss/:id/:i', update


module.exports = router;

function create(req, res, next) {
    orderService.create(req.body)
        .then(order => {
            
            io.emit('ordinazione-creata', order);
            return (order ? res.json(order) : res.status(400).json({ message: 'order does not exist' }))
        })
        .catch(err => next(err));
}

function get(req, res, next) {
    orderService.get(req.query.orderId)
        .then(orders => res.json(orders))
        .catch(err => next(err));
}

function update(req, res, next) {
    console.log(req)
    orderService.update(req.params.orderId, req.body, req.query.id)
        .then((orders) => {
            io.emit('nuovo-piatto-aggiunto', "ciao");
            
            return (res.json(orders))
            
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    orderService.delete(req.query.orderId, req.query.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}