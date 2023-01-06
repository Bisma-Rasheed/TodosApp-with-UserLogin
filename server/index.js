const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//api and data serving using node file system
// const route = require('./routes');

//api and data serving using mongodb
const route = require('./routesnew');

//connection to mongodb using mongoose package
mongoose.connect("mongodb://localhost:27017/userportal", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection successful..');
}).catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use('/', route);

app.listen(3001, () => {
    console.log('server listening on 3001');
})