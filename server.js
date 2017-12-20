const express = require ('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));



MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    require('./app/routes')(app, database.db('notable'));
    app.listen(port, () =>{
        console.log('wee Live ' + port)
})

})