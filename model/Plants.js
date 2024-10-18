const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    imgSrc: {
        type: String,
        required: false
    },
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
    },
    water: {
        type: String,
        required: false
    },
    light: {
        type: String,
        required: false
    },
    humidity: {
        type: String,
        required: false
    },
    tempLow: {
        type: Number,
        required: false
    },
    tempHigh: {
        type: Number,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    text: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Plant', plantSchema);