const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// importing routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const dburl = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const dbconnection = mongoose.connection;
dbconnection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// using routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});