const express = require('express');
const router = express.Router();
const dishService = require('./dishes.service');

// routes
router.post('/dishes', create);
router.get('/dishes', getAll);
router.get('/dishes/:id', getById);
router.put('/dishes/:id', update);
router.delete('/dishes/:id', _delete);

module.exports = router;

function create(req, res, next) {
    dishService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    dishService.getAll()
        .then(dishes => res.json(dishes))
        .catch(err => next(err));
}

function getById(req, res, next) {
    dishService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    dishService.update(req.params.id, req.body)
        .then(() => res.json())
        .catch(err => next(err));
}

function _delete(req, res, next) {
    dishService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}