require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/live_pusher_son', { useNewUrlParser: true });

app.listen(3000, () => console.log('Express has been started.. http://localhost:3000'));