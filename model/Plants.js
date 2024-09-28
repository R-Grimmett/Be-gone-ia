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
        type: Number,
        required: false
    },
    light: {
        type: Number,
        required: false
    },
    humidity: {
        type: Number,
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