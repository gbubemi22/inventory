require('dotenv').config();
require("express-async-errors");
const express = require('express');

const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');

app.get('/', async (req, res) => {
     res.json('welcome to my store')
})

//client.connect()
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}, DATABASE CONNECTED`,));

