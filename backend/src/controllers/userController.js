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

exports.getUserbyToken = (req, res) => {
    const user = jwt.verify(req.params.id, 'secret_key');
    
    userModel.findOne()
        .where('username').equals(user.username)
        .then(doc => {
            if (!doc) {
                return res.status(404).send('User not found');
            }
            res.json(doc.username);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.login = (req, res) => {
    const { username, password } = req.query;

    userModel.findOne()
        .where('username').equals(username)
        .where('password').equals(password)
        .then(user => {
            if (!user) {
                return res.status(500).send('Wrong credentials');
            }
            const token = jwt.sign({ username: user.username, password: user.password, admin: user.admin }, 'secret_key');
            res.json({ token });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.register = (req, res) => {
    const { name, surname, username, password, locations } = req.body.params;

    const newUser = new userModel({
        name: name,
        surname: surname,
        username: username,
        password: password,
        admin: 0,
        avatarPicture: 1,
        locations: locations
    })
    newUser.save()
        .then(user => {
            const token = jwt.sign({ username: user.username, password: user.password, admin: user.admin }, 'secret_key');
            res.json({ token });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

exports.updateProfile = (req, res) => {
    const filter = { username: req.params.id }; // Get the User ID from the request parameters
    const updateData = req.body.data; // Get the updated data from the request body

    userModel
        .findOneAndUpdate(filter, updateData, { new: true }) // { new: true } returns the updated document
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}