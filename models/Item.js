const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = Item = mongoose.model('todoitem', ItemSchema);
