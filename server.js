const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const CONFIG = require('./config.js');
const bb = require('bluebird');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.Promise = bb;

// mongo models begin
const Todo = require('./db_models/Todo');
// mongo models end

app.use(express.static('public'));

mongoose.connect(CONFIG.MONGO_URI,
    {useMongoClient: true});


// routes begin
app.post("/todos", function (req, res) {
    console.log(req.body);
    todo = new Todo(req.body);
    todo.save().then(function () {

        res.send("asd");
    });
});

app.get("/listAll", function (req, res) {
    Todo.find({}).then(function (users, err) {
        res.send(users);
    })
});

app.post("/update", function (req, res) {
    var updated = req.body;
    Todo.update({_id: updated._id}, updated).then(function (users, err) {
        res.end();
    })
});

app.post("/add", function (req, res) {
    var newTodo = new Todo(req.body);
    newTodo.save().then(function (savedTodo) {
        res.send(savedTodo);
    }).catch(function (err) {
        console.log("error", err);
    })
});

app.post("/delete", function (req, res) {
    var delTodo = new Todo(req.body);
    Todo.findByIdAndRemove(req.body._id).then(function (res) {

        console.log("del", res);
    }).catch(function (err) {
        console.log("del err", err)
    });


});
// routes end


// spin up server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});