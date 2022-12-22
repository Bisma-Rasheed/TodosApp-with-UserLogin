const express = require('express')
const app = express();
const cors = require('cors');

const route = require('./routes');

app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use('/', route);

app.listen(3001, () => {
    console.log('server listening on 3001');
})