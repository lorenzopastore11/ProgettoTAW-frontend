const express = require('express');
const router = express.Router();
const tableService = require('./tables.service');

// routes
router.post('/tables', create);
router.get('/tables', getAll);
//router.get('/tables/:role', getAllByUser);
router.get('/tables/:id', getById);
router.put('/tables/:id', update);
router.delete('/tables/:id', _delete);

module.exports = router;

function create(req, res, next) {
    tableService.create(req.body)
        .then(table => table ? res.json(table) : res.status(400).json({ message: 'Table does not exist' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    tableService.getAll(req.query.username)
        .then(tables => res.json(tables))
        .catch(err => next(err));
}

function getById(req, res, next) {
    tableService.getById(req.params.id)
        .then(table => table ? res.json(table) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    tableService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    tableService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}