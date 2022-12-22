const route = require('express').Router();
const fs = require('fs');

route.get('/', (req, res) => {
    res.send('hello from server');
})
route.get('/readuser', (req, res) => {
    fs.readFile('userApi.json', 'utf-8', (err, data) => {
        console.log('file read successfully' + JSON.parse(data));
        res.send(data);
    })

});

route.post('/adduser', (req, res) => {
    var userData = JSON.parse(fs.readFileSync('userApi.json'));
    var bool = validateUsername(userData, req.body);
    if (!bool) {
        userData.push(req.body);
        fs.writeFileSync('userApi.json', JSON.stringify(userData));
        res.send({ message: "user added" });
    }
    else{
        res.send({message: 'user not added, already exists'});
    }

});

const validateUsername = (userData, user) => {
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
module.exports = route;