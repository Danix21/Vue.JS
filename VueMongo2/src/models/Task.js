const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
    title: String,
    _description: String,
    get description() {
        return this._description;
    },
    set description(value) {
        this._description = value;
    },
});

module.exports = mongoose.model('Task', Task);