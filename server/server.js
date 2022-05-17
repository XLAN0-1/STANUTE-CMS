//Set up dotenv
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Set up app to use json and urlencodedform
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connect to the mongoose databas
mongoose.connect(`mongodb+srv://admin-lana:${process.env.DB_PASSWORD}@cluster0.4ltqi.mongodb.net/cms?retryWrites=true&w=majority`);

//Import the routes
const userRouter = require('../routes/user');
const courseRouter = require('../routes/course');
const notificationRouter = require('../routes/notification');





app.use('/', userRouter);
app.use('/', courseRouter);
app.use('/', notificationRouter);

module.exports = app;