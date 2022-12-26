const route = require('express').Router();
const fs = require('fs');

route.get('/', (req, res) => {
    res.send('hello from server');
})
route.post('/readuser', (req, res) => {
    var userData = JSON.parse(fs.readFileSync('userApi.json'));
    var [bool, index] = validateUser(userData, req.body);
    if(bool){
        res.send({data: userData[index]});
    }
    else{
        res.send({error: 'The username or password is incorrect'});
    }

});

route.post('/adduser', (req, res) => {
    var userData = JSON.parse(fs.readFileSync('userApi.json'));
    var bool = checkUnique(userData, req.body);
    if (!bool) {
        userData.push(req.body);
        fs.writeFileSync('userApi.json', JSON.stringify(userData));
        res.send({ message: "user added" });
    }
    else {
        res.send({ message: 'user not added, already exists' });
    }

});

route.post('/addtodo', (req, res)=>{
    var userData = JSON.parse(fs.readFileSync('userApi.json'));
    for(var i=0; i<userData.length;i++){
        if(userData[i].username === req.body.currentUser.username){
            userData[i].Todos.push(req.body.Todo);
            fs.writeFileSync('userApi.json', JSON.stringify(userData));
            res.send({data: userData[i]});
        }
    }
});

route.post('/deletetodo', (req,res)=>{
    var userData = JSON.parse(fs.readFileSync('userApi.json'));
    for(var i=0; i<userData.length; i++){
        if(userData[i].username === req.body.currentUser.username){
            userData[i].Todos = userData[i].Todos.filter((arrItem, index)=>{
                return index !== req.body.id
            });
            fs.writeFileSync('userApi.json', JSON.stringify(userData));
            res.send({data: userData[i]});
        }
    }
})

const checkUnique = (userData, user) => {
    if (userData.length === 0) {
        return false;
    }
    else {
        for (var i = 0; i < userData.length; i++) {
            if (userData[i].username === user.username) {
                return true;
            }
            else if (userData[i].username !== user.username && i === userData.length - 1) {
                return false;
            }
        }
    }
}

const validateUser = (userData, user) => {
    if (userData.length === 0) {
        return [false, 0];
    }

    for (var i = 0; i < userData.length; i++) {

        if (userData[i].username === user.un && userData[i].password === user.pw) {
            return [true, i];
         
        }
        else if (i === userData.length - 1) {
            return [false, 0];

        }
    }
}
module.exports = route;