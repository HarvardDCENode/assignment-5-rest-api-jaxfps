var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
// Add routes
var playerRouter = require('./routes/player');
var apiPlayerRouter = require('./routes/api/api-players');
var teamRouter = require('./routes/team');
var addPlayerRouter = require('./routes/addPlayer');
var listPlayersRouter = require('./routes/listplayers');
var homePageRouter = require('./routes/homePage');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@jax.wg8rthk.mongodb.net/?retryWrites=true&w=majority&appName=jax`)
    .catch(err => console.log(err))
    .then(() => {
        console.log('Connected to MongoDB!');
    });




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.redirect('/homePage');
});

// Configure the app to use the routes
app.use('/homePage', homePageRouter);
app.use('/team', teamRouter);
app.use('/addplayer', addPlayerRouter);
app.use('/listplayers', listPlayersRouter);
app.use('/player', playerRouter);
//configure the api routes
app.use('/api/players', apiPlayerRouter);



//catch any remaining routing errors
app.use((req, res, next) => {
    res.status(404);
    res.end('Sorry, this file cannot be found.');
});

module.exports = app;
