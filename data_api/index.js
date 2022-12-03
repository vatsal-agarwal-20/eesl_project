const express = require('express');
// const connection = require('./connection');
const app = express();
const bodyParser= require('body-parser');
// const ActivityLogRoute = require('./routes/activity_log')

// const cors = require("cors");

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use('./activity_log', ActivityLogRoute);

module.exports = app;