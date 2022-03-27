const express = require("express");
const app = express();
require('dotenv').config({ path: './.env' });
require('./helpers/db');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order');
const categoryRoute = require('./routes/category');
const productsRoute = require('./routes/product');
const { errorHandler } = require("./helpers/errorHandeler");
const helmet = require('helmet');
const cors = require('cors');
const compressoin = require('compression');
const morgan = require('morgan');
require('express-async-errors');
app.use(compressoin());
app.use(helmet());
app.use(cors({
    origin: "*"
}))
const port=process.env.PORT || 5000;

app.use(express.json());
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/products', productsRoute);
app.use('/category', categoryRoute);
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ sucess: false, message: "Route not forund !" })
})
app.use(morgan('tiny'));

app.listen(port, () => {
    console.log("server running at 3000");
})