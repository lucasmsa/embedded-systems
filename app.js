const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
var firebase = require('firebase');
var firebaseApp = firebase.initializeApp();
var { Timer } = require('easytimer.js');
var timerInstance = new Timer();



const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})