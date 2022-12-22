const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.get('/', (req, res)=>{
    res.json({message: 'hello from server bisma'});
});

app.listen(3000, ()=>{
    console.log('server listening on 3000');
})