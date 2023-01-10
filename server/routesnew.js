const route = require('express').Router();
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//requires mongoose
const mongoose = require('mongoose');
//fetches schema from userportal model
const userSchema = require('./Model/Userportal')(mongoose);
//creates a user model based on defined schema
const User = new mongoose.model('User', userSchema);

route.get('/', (req, res) => {
    res.send('hello from server');
});


route.post('/readuser', async (req, res) => {

    var userData = await User.find({ username: req.body.username });
    if (userData[0] !== undefined) {
        const isvalidPassword = compareSync(req.body.password, userData[0].password);
        if (isvalidPassword) {
            const jwtToken = jwt.sign({ id: userData[0]._id, username: userData[0].username }, process.env.API_SECRET);
            res.send({ data: userData[0], accessToken: jwtToken });
        }
        else {
            res.send({ error: 'The password is incorrect' });
        }
    }
    else {
        res.send({ error: 'The user doesnt exist' });
    }

});

route.post('/adduser', async (req, res) => {
    const salt = genSaltSync(10);
    const password = hashSync(req.body.password, salt);

    var userData = await User.find({ username: req.body.username });
    if (userData[0] === undefined) {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: password,
            Todos: req.body.Todos
        });

        const result = await user.save();
        res.send({ message: "user added" });
    }
    else {
        res.send({ message: 'user not added, already exists' });
    }

});

route.use('/addtodo', verifyToken);

route.post('/addtodo', async (req, res) => {
    var userData = await User.find({ username: req.body.currentUser.username });
    const _id = userData[0]._id;
    var userData = await User.findByIdAndUpdate(
        { _id },
        { $push: { Todos: req.body.Todo } },
        { new: true }
    );
    res.send({ data: userData });
});

route.use('/deletetodo', verifyToken);

route.post('/deletetodo', async (req, res) => {
    var userData = await User.find({ username: req.body.currentUser.username });
    var Todos = userData[0].Todos;
    Todos.splice(req.body.id, 1);
    const _id = userData[0]._id;
    var userData = await User.findByIdAndUpdate(
        { _id },
        { $set: { Todos: Todos } },
        { new: true }
    )
    res.send({ data: userData });

});

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1];
    
    if (token === null) return res.send({ error: 'Unauthorized user' })
    jwt.verify(token, process.env.API_SECRET, (err, data) => {
        if (err || data.username !== req.body.currentUser.username) 
        return  res.send({ error: 'Unauthorized user' });
        next();
    })
}

module.exports = route;