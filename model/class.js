const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tutor: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }


})

module.exports = mongoose.model('Course', classSchema);
