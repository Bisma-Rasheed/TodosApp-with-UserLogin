const express = require('express')
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send({message: "hello from server"});
})
app.get('/readuser', (req, res)=>{
    //res.json({message: 'hello from server bisma'});
    fs.readFile('userApi.json', 'utf-8', (err, data)=>{
        console.log('file read successfully'+data);
        res.send(data);
    })
});

app.listen(3001, ()=>{
    console.log('server listening on 3001');
})