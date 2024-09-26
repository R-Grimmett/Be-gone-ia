const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    family: {
        type: String,
        required: false
    },
    genus: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    common: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Plant', plantSchema);