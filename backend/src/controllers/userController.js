const { userModel } = require('../models/usersModel.js');
const jwt = require('jsonwebtoken');

exports.getUserbyUsername = (req, res) => {
    userModel.findOne()
        .where('username').equals(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.login = (req, res) => {
    const { username, password } = req.query;
    console.log(req);
    userModel.findOne()
        .where('username').equals(username)
        .where('password').equals(password)
        .then(user => {
            if (!user) {
                return res.status(404).send('Wrong credentials');
            }
            const token = jwt.sign({ user: user }, 'secret_key');
            res.json({ token, user });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}
