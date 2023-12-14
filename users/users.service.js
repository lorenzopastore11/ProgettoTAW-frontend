const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const Users = db.Users;

module.exports = {
    authenticate,
    check,
    get,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await Users.findOne({ username });
    if (user && bcrypt.compareSync(password, user.pwd)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1h' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function check() {
    return await Users.findOne()
}

async function get(id, role) {
    if(id !== "undefined") {
        return await Users.findById(id);
    }
    else {
        if(role !== "undefined") {
            return await Users.find({role});
        }
        else return await Users.find();
    }
}

async function create(userr) {
    // validate
    if (await Users.findOne({ username: userr.username })) {
        throw 'Username "' + userr.username + '" is already taken';
    }

    const user = new Users(userr);

    // hash pwd
    if (userr.password) {
        user.pwd = bcrypt.hashSync(userr.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userr) {
    const user = await Users.findById(id);
    // validate
    if (!userr) throw 'User not found';
    if (userr.username !== userr.username && await Users.findOne({ username: userr.username })) {
        throw 'Username "' + userr.username + '" is already taken';
    }

    // hash pwd if it was entered
    if (userr.password) {
        userr.password = bcrypt.hashSync(userr.password, 10);
    }

    // copy user properties to user
    Object.assign(user, userr);

    await user.save();
}

async function _delete(id) {
    await Users.findByIdAndRemove(id);
}