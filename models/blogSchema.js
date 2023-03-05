const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        require: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        require: true
    }
}, { timestamps: true });

const BlogModel = mongoose.model('blogs', blogSchema);
module.exports = BlogModel;