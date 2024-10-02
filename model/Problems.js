const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    imgSrc: {
        type: String,
        required: false
    },
    common: {
        type: [String],
        required: true
    },
    scientific: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    leafTags: {
        type: [String],
        required: false
    },
    flowerTags: {
        type: [String],
        required: false
    },
    stemTags: {
        type: [String],
        required: false
    },
    rootTags: {
        type: [String],
        required: false
    },
    wholeTags: {
        type: [String],
        required: false
    },
    growthTags: {
        type: [String],
        required: false
    },
    treatment: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Problem', problemSchema);