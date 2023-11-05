const mongoose = require("mongoose");
const Blog = require("../schema/blog");
const User = require("../schema/user");

exports.deleteblog = async function (req, res) {
    try {
        let count = 0;
        const id = req.params.id;
        const userId = req.session.myblog._id;
        await Blog.findOneAndDelete({ _id: id });
        const user = await User.findOne({ _id: userId }).populate("blog");
        let userBlogs = user.blog;
        for (let i = 0; i < userBlogs.length; i++) {
            count = i;
            if (userBlogs[i]._id === id) {
                break;
            }
        }
        const newBlogs = userBlogs.splice(count, 1);
        newBlogs.forEach(blog => {
            user.blog.push(blog);
        });
        await user.save().then(function () {
            console.log("deleted blog from user");
        });
        res.redirect("/dashboard/home");
    } catch (error) {
        console.log(error);
    }
}