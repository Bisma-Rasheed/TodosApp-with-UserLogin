const route = require('express').Router();

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
    var userData = await User.find({ username: req.body.un });
    if (userData[0] !== undefined && userData[0].password === req.body.pw) {
        res.send({ data: userData[0] });
    }
    else {
        res.send({ error: 'The username or password is incorrect' });
    }

});

route.post('/adduser', async (req, res) => {
    var userData = await User.find({ username: req.body.username });
    if (userData[0] === undefined) {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            Todos: req.body.Todos
        });

        const result = await user.save();
        res.send({ message: "user added" });
    }
    else {
        res.send({ message: 'user not added, already exists' });
    }

});

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
    res.send({data: userData});

});

module.exports = route;

