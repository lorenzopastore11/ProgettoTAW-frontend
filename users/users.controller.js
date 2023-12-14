const express = require('express');
const router = express.Router();
const userService = require('./users.service');

// routes
router.post('/login', authenticate);
router.post('/register', register);
router.get('/users/check', check);
router.get('/users/:id', get);
router.put('/users/:id', update);
router.delete('/users/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function check(req, res, next) {
    userService.check()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function get(req, res, next) {
    console.log(req)
    userService.get(req.params.id, req.query.query)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}