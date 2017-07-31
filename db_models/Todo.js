/**
 * Created by ngalstyan on 7/31/17.
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
var Todo = mongoose.model('Todo',
    {
        author: {type: String, required: true},
        content: {type: String, required: true},
        date: {type: Date, required: true, default: Date.now},
        done: {type: Boolean, required: true, default: false}
    });

module.exports = Todo;
