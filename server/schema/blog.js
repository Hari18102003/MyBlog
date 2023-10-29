const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    user: {
        type: String,
    }
});

blogSchema.index({ title: "text", content: "text" });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;