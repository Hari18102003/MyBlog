const mongoose = require("mongoose");
const Blog = require("../schema/blog");

exports.deleteblog = async function (req, res) {
    try {
        const id = req.params.id;
        await Blog.findOneAndDelete({ _id: id });
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}