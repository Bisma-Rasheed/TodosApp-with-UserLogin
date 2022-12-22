const route = require('express').Router();
const fs = require('fs');

route.get('/', (req, res) => {
    res.send('hello from server');
})
route.post('/readuser', (req, res) => {
    // console.log(req.body);
    // fs.readFile('userApi.json', 'utf-8', (err, data) => {
    //     // console.log('file read successfully' + data);
    //     res.send({message: data});
    // })
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
        //alert('The username or password is incorrect');
    }

    for (var i = 0; i < userData.length; i++) {

        if (userData[i].username === user.un && userData[i].password === user.pw) {

            return [true, i];
            // //dispatch(loggingIn(true));
            // //dispatch(currentUser(users[i]));
            // navigate('/dashboard');

            // alert('successfully logged in')
            // break;

        }
        else if (i === userData.length - 1) {
            return [false, 0];
            //alert('username or password is incorrect');
        }
    }
}
module.exports = route;