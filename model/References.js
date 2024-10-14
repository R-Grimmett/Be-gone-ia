const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
    referenceType: {
        type: String,
        required: true,
    },
    referenceString: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Reference', referenceSchema);